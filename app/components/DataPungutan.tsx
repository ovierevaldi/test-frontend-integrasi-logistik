'use client'

import ApiProvider from "@/libs/api-provider";
import { ConversionRates, DataPungutanProp, Kurs, ListKurs } from "@/types/Data";
import { useEffect, useRef, useState } from "react";
import Loading from "./UI/Loading";
import Input from "./UI/Input";
import Select from "./UI/Select";
import RandomButton from "./RandomButton";
import { ConvertCurrency } from "@/libs/helper";

type DataPungutanPageProp =  {
  id_aju: string | undefined,
  onSubmit?: boolean,
  canNext: (state: boolean, data: {}) => void
};

const DataPungutan = ({id_aju, canNext} : DataPungutanPageProp) => {
  const [data, setData] = useState<DataPungutanProp>();
  const [isFetchingApi, setIsFetchingApi] = useState(false);
  const [isErrorApi, setIsErrorApi] = useState(false);
  const [selectedKurs, setSelectedKurs] = useState<Kurs>(ListKurs[0]);
  const [voluntaryDeclaration, setVoluntaryDeclaration] = useState(0);
  const [nilaiFOB, setNilaiFOB] = useState(0);
  const [nilaiCIF, setNilaiCIF] = useState(0);
  const [CIFInRp, setCIFInRP] = useState(0);
  const [nilaiKursIDR, setNilaiKursIDR] = useState(0);
  const [refetchKurs, setRefetchKurs] = useState(0);
  const isFirstRender = useRef(true);
  const [isFetchingKurs, setIsFetchingKurs] = useState(false);
  const [defaultData, setDefaulData] = useState<DataPungutanProp>();
  
  useEffect(() => {
    const getDataPungutan = async () => {
      if(id_aju){
        setIsFetchingApi(true);

        const response = await ApiProvider.getDataPungutan(id_aju);
        const data = response.data as DataPungutanProp;

        if(!response.error){
          setDefaulData(data);
          setData(data);

          if(data?.kd_valuta){
            const kurs = ListKurs.find((value) => value.code === data.kd_valuta);
            if(kurs){
              setSelectedKurs(kurs);
            };
          };
        }
        else{
          setIsErrorApi(true);
          console.log('Cannot Get Api')
        };

        setIsFetchingApi(false);
      }
    };
    getDataPungutan();
  }, [id_aju]);


  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const getKurs = async () => {
      setIsFetchingKurs(true);

      const response = await ApiProvider.getExchangeRate(selectedKurs.code);

      if(!response.error){
        const rates = response as ConversionRates;
        
        setNilaiKursIDR(() => {
          const idrRates = rates.conversion_rates.IDR;
          setCIFInRP(nilaiCIF * idrRates);
          return idrRates;
        });

        if(defaultData){
          if(defaultData?.kd_valuta !== selectedKurs.code){
            const defaultKursValue = rates.conversion_rates[defaultData.kd_valuta as keyof typeof rates.conversion_rates];
            setData((prev) => {
              
              if(!prev)
                return;
  
              return {...prev, 
                nilai_incoterm: convertValuta(Number(defaultData.nilai_incoterm), defaultKursValue).toString(),
                biaya_tambahan: convertValuta(Number(defaultData.biaya_tambahan), defaultKursValue).toString(),
                biaya_pengurang: convertValuta(Number(defaultData.biaya_pengurang), defaultKursValue).toString(),
                nilai_asuransi: convertValuta(Number(defaultData.nilai_asuransi), defaultKursValue).toString(),
                freight: convertValuta(Number(defaultData.freight), defaultKursValue).toString(),
                berat_bersih: convertValuta(Number(defaultData.berat_bersih), defaultKursValue).toString(),
                berat_kotor: convertValuta(Number(defaultData.berat_kotor), defaultKursValue).toString(),
              }
            })
          }
          else{
            setData(() => {
              return {...defaultData}
            })
          }
        }
      }
      else{
        console.log('Cannot Get Api')
      };

      setIsFetchingKurs(false);
    };

    getKurs();
  }, [refetchKurs, selectedKurs]);

  useEffect(() => {
    const hasilFOB = hitungFOB(Number(data?.nilai_incoterm), Number(data?.biaya_tambahan), Number(data?.biaya_pengurang), voluntaryDeclaration);
    hitungCIF(hasilFOB, Number(data?.nilai_asuransi), Number(data?.freight));

  }, [data, voluntaryDeclaration]);

  useEffect(() => {
    setCIFInRP(nilaiCIF * nilaiKursIDR);
  }, [nilaiCIF, nilaiKursIDR]);

  const simpanData = () => {
    const data = {
      nilai_fob: nilaiFOB,
      nilai_cif: nilaiCIF,
      cif_in_rp: CIFInRp,
      voluntaryDeclaration: voluntaryDeclaration,
      valuta_code: selectedKurs.code,
    }
    canNext(true, data);
  }

  const hitungFOB = (nilai: number, biaya_tambahan: number, biaya_pengurang: number, voluntaryDeclaration: number) => {
    const hasil = (nilai + biaya_tambahan) - (biaya_pengurang + voluntaryDeclaration);
    setNilaiFOB(hasil);
    return hasil;
  };

  const hitungCIF =  (fob: number, nilai_asuransi: number, freight: number) => {
    setNilaiCIF(fob + nilai_asuransi + freight);
  };

  const convertValuta = (base_value: number, kursValue: number) => {
    return (base_value + (base_value - kursValue * base_value)).toString()
  }

  return id_aju ? 
  <div>

    {!isFetchingApi && !isErrorApi &&   
    <div className="space-y-8">
      <div className='flex gap-x-8'>
        <Input data={{label: 'Incoterms', readonly: true, type: 'text', value: data?.ur_incoterm || ''}}/>

        <Select 
          data={{label: 'Valuta', readonly: false, value: selectedKurs.code, 
          options: {label: ListKurs.map(value => value.name), value: ListKurs.map(value => value.code)}}}
          valueChanged={(e) => {
            const kurs = ListKurs.find(value => value.code === e);

            if(kurs)
              return setSelectedKurs(kurs);
          }}>
        </Select>

        {
          !isFetchingKurs ? <div className='flex gap-x-4 items-center'>
          <Input data={{label: 'Kurs', readonly: true, type: 'text', value: ConvertCurrency('IDR', nilaiKursIDR)}}/>
          <div className='h-fit translate-y-1/3'>
            <RandomButton onBtnClick={() => setRefetchKurs(refetchKurs + 1)} />
          </div>
        </div> : <Loading />
        }
      </div>

      <div className='flex gap-x-8 flex-wrap gap-y-4'>
        <Input data={{label: 'Nilai', readonly: true, type: 'text', value: ConvertCurrency(selectedKurs.code, Number(data?.nilai_incoterm) || 0)}}/>
        <div className='flex items-center text-xl font-bold'>
          <span className='translate-y-1/3'>+</span> 
        </div>

        <Input data={{label: 'Biaya Tambahan', readonly: true, type: 'text', value: ConvertCurrency(selectedKurs.code, Number(data?.biaya_tambahan) || 0)}}/>
        <div className='flex items-center text-xl font-bold'>
          <span className='translate-y-1/3'>-</span> 
        </div>

        <Input data={{label: 'Biaya Pengurang', readonly: true, type: 'text', value: ConvertCurrency(selectedKurs.code, Number(data?.biaya_pengurang) || 0)}}/>
        <div className='flex items-center text-xl font-bold'>
          <span className='translate-y-1/3'>+</span> 
        </div>

        <Input 
          data={{label: `Voluntary Declaration (${selectedKurs.code})`, readonly: true, type: 'number', value: voluntaryDeclaration, controlReadonly: true }}
          inputValue={(e) => {setVoluntaryDeclaration(+e)}}
        />
        <div className='flex items-center text-xl font-bold'>
          <span className='translate-y-1/3'>=</span> 
        </div>

        <Input data={{label: 'Nilai FOB', readonly: true, type: 'text', value: ConvertCurrency(selectedKurs.code, nilaiFOB)}}/>
      </div>

      <div className='flex gap-x-8'>
        <Input data={{label: 'Asuransi Bayar Di', readonly: true, type: 'text', value: data?.ur_asuransi || ''}}/>
        <Input data={{label: 'Asuransi', readonly: true, type: 'text', value: ConvertCurrency(selectedKurs.code, Number(data?.nilai_asuransi)) || '0'}}/>
        <Input data={{label: 'Freight', readonly: true, type: 'text', value: ConvertCurrency(selectedKurs.code, Number(data?.freight)) || '0'}}/>
      </div>

      <div className='flex flex-wrap gap-x-8 gap-y-4'>
        <Input data={{label: 'CIF', readonly: true, type: 'text', value: ConvertCurrency(selectedKurs.code, nilaiCIF)}}/>
        <Input data={{label: 'CIF Rp', readonly: true, type: 'text', value: ConvertCurrency('IDR', CIFInRp)}}/>

        <Input data={{label: 'Bruto', readonly: true, type: 'text', value: ConvertCurrency(selectedKurs.code, Number(data?.berat_kotor)) || '0'}}/>
        <Input data={{label: 'Netto', readonly: true, type: 'text', value: ConvertCurrency(selectedKurs.code, Number(data?.berat_bersih)) || '0'}}/>
        <Input data={{label: 'Flag Kontainer', readonly: true, type: 'text', value: data?.ur_flag_curah || ''}}/>
      </div>

        <div className="flex justify-center">
          <button 
            onClick={simpanData}
            className="p-2 bg-yellow-500 text-white rounded hover:bg-white hover:border hover:border-yellow-500 hover:text-yellow-500">Simpan Data</button>
        </div>
    </div>
    }
    {
      isFetchingApi && <Loading />
    }
    {
      isErrorApi && <p className="text-red-500 text-center font-semibold">Cannot Get Api for Data Pungutan</p>
    }
  </div> 
  : <p>Please Enter id_aju</p>
}

export default DataPungutan