'use client'

import React, { useEffect, useRef, useState } from 'react'
import ApiProvider from '@/libs/api-provider';
import { ConversionRates, DataPungutanProp, Kurs, ListKurs } from '@/types/Data';
import Input from './UI/Input';
import Select from './UI/Select';
import RandomButton from './RandomButton';
import { ConvertCurrency } from '@/libs/helper';


type DataPungutanPageProp =  {
  id_aju: string | undefined,
  onSubmit: boolean,
  canNext: (state: boolean) => void
}

const DataPungutan = ({id_aju, onSubmit, canNext} : DataPungutanPageProp) => {
  const [data, setData] = useState<DataPungutanProp>();
  const [selectedKurs, setSelectedKurs] = useState<Kurs>(ListKurs[0]);
  const [refetchKurs, setRefetchKurs] = useState(0);
  const [nilaiKursIDR, setNilaiKursIDR] = useState(0);
  const [voluntaryDeclaration, setVoluntaryDeclaration] = useState(0);
  const [nilaiFOB, setNilaiFOB] = useState(0);
  const [nilaiCIF, setNilaiCIF] = useState(0);
  const [CIFInRp, setCIFInRP] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if(onSubmit){
      canNext(true)
    }
  }, [onSubmit]);

  useEffect(() => {
    const getDataUtama = async () => {
      if(id_aju){
        const response = await ApiProvider.getDataPungutan(id_aju);

        if(!response.error){
          setData(() => {
            const data = response.data as DataPungutanProp;

            if(data.kd_valuta){
              const kurs = ListKurs.find((value) => value.code === data.kd_valuta);
              if(kurs){
                setSelectedKurs(kurs);  
              };
            };

            const hasilFOB = hitungFOB(Number(data.nilai_incoterm), Number(data.biaya_tambahan), Number(data.biaya_pengurang), voluntaryDeclaration);
            hitungCIF(hasilFOB, Number(data?.nilai_asuransi), Number(data?.freight));
            
            return data;
          });
          
        }
        else{
          console.log('Cannot Get Api')
        };
      }
    };

    getDataUtama();
  }, [id_aju, nilaiCIF, voluntaryDeclaration]);

  useEffect(() => {
    
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const getKurs = async () => {
      const response = await ApiProvider.getExchangeRate(selectedKurs.code);

      if(!response.error){
        const data = response as ConversionRates;
        
        setNilaiKursIDR(() => {
          const idrRates = data.conversion_rates.IDR;
          setCIFInRP(nilaiCIF * idrRates);
          return idrRates;
        });
      }
      else{
        console.log('Cannot Get Api')
      }
    };

    getKurs();
  }, [selectedKurs, nilaiCIF]);

  const hitungFOB = (nilai: number, biaya_tambahan: number, biaya_pengurang: number, voluntaryDeclaration: number) => {
    const hasil = (nilai + biaya_tambahan) - (biaya_pengurang + voluntaryDeclaration);
    setNilaiFOB(hasil);
    return hasil;
  };

  const hitungCIF =  (fob: number, nilai_asuransi: number, freight: number) => {
    setNilaiCIF(fob + nilai_asuransi + freight);
  };

  return id_aju ? 
  <div className='space-y-8'>
    <div className='flex gap-x-8'>
        <Input data={{label: 'Incoterms', readonly: true, type: 'text', value: data?.ur_incoterm || ''}}/>
        
        <Select 
          data={{label: 'Valuta', readonly: true, value: selectedKurs.code, 
          options: {label: ListKurs.map(value => value.name), value: ListKurs.map(value => value.code)}}}
          valueChanged={(e) => {
            const kurs = ListKurs.find(value => value.code === e);
            if(kurs)
              return setSelectedKurs(kurs);
          }}>
        </Select>
        
        <div className='flex gap-x-4 items-center'>
          <Input data={{label: 'Kurs', readonly: true, type: 'text', value: ConvertCurrency('IDR', nilaiKursIDR)}}/>
          <div className='h-fit translate-y-1/3'>
            <RandomButton onBtnClick={() => setRefetchKurs(refetchKurs + 1)} />
          </div>
        </div>

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
        data={{label: `Voluntary Declaration ${selectedKurs.code}`, readonly: true, type: 'number', value: voluntaryDeclaration, controlReadonly: true }}
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

    <div className='flex gap-x-4 justify-center'>
        {/* <TabButton disabled={false} handleBtnClick={cekKelengkapanData} bgColor='yellow' textColor='true'>Kelengkapan Data</TabButton> */}
        {/* <TabButton type='submit' disabled={false} handleBtnClick={() => {}} bgColor='blue' textColor='true'>Simpan</TabButton> */}
    </div>
  </div> 
  : <p>Please Enter id_aju</p>
}

export default DataPungutan