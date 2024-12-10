import Input from './UI/Input'
import { DataUtamaProp } from '@/types/Data'
import Select from './UI/Select'
import Loading from './UI/Loading'
import { useEffect, useRef, useState } from 'react'
import RandomButton from './RandomButton'
import {generateUUID} from '@/libs/helper'
import zodValidation, { DataPemberitahuanSchemaProp, ErrorDataPemberitahuanSchema } from '@/libs/zod-validations'

type DataUtamaPageProp = {
  data: DataUtamaProp | undefined,
  onSubmit: boolean,
  canNext: (state: boolean, data: {}) => void;
}

const DataUtama = ({data, onSubmit, canNext} : DataUtamaPageProp) => {

  const [nomorPendaftaran, setNomorPendaftaran] = useState('');
  const [tanggalPendaftaran, setTanggalPendaftaran] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const [errorForm, setErrorForm] = useState<ErrorDataPemberitahuanSchema>({nomor_pendaftaran: [], tanggal_pendaftaran: []});

  useEffect(() => {
    if(onSubmit){
      if(formRef.current){
        const result = checkForm(formRef.current);
        canNext(result.result, result.data)
      }
    }
  }, [onSubmit, canNext]);

  const checkForm = (form: HTMLFormElement): {result: boolean, data: {}} => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const validationResult = zodValidation().parseDataPemberitahuan(data as DataPemberitahuanSchemaProp);

    if(!validationResult.success){
      setErrorForm((prev) => {
        const listErr = validationResult.error.flatten().fieldErrors as ErrorDataPemberitahuanSchema;
        return {...prev, ...listErr}
      });
      return {result: false, data: {}};
    }
    else{
      setErrorForm({nomor_pendaftaran: [], tanggal_pendaftaran: []});
      return {result: true, data: {nomor_pengajuan: validationResult.data.nomor_pengajuan, nomor_pendaftaran: validationResult.data.nomor_pendaftaran, tanggal_pendaftaran: validationResult.data.tanggal_pendaftaran, }};
    }
  }

  return data ? 
    <form className='space-y-8' ref={formRef}>
      <p className='text-2xl font-bold mb-4'>Data Pemberitahuan</p>

      <div className='flex gap-x-8 flex-wrap gap-y-4'>
          <Input data={{label: 'Nomer Pengajuan', readonly: true, type: 'text', value: data?.nomor_pengajuan || '', name:'nomor_pengajuan'}}/>

          <Input data={{label: 'Tanggal Pengajuan', readonly: true, type: 'text', value: data?.tanggal_pengajuan || '', name: 'tanggal_pengajuan'}}/>

          <div className='flex items-center gap-x-2'>
            <Input 
              data={{label: 'Nomer Pendaftaran', readonly: false, type: 'text', value: nomorPendaftaran, placeholder: 'Nomor Pendaftaran', name:'nomor_pendaftaran',
                error: {
                  isError: errorForm.nomor_pendaftaran.length > 0,
                  message: errorForm.nomor_pendaftaran[0]
                }
              }} 
              inputValue={(value: string) => setNomorPendaftaran(value)} 
            />

            <div className='h-fit translate-y-1/3'>
              <RandomButton onBtnClick={() => setNomorPendaftaran(generateUUID())}/>
            </div>
           
          </div>

          <Input data={{label: 'Tanggal Pendaftaran', readonly: false, type: 'date', value: tanggalPendaftaran, placeholder: 'Tanggal Pendaftaran', name:'tanggal_pendaftaran', 
            error: {
                  isError: errorForm.tanggal_pendaftaran.length > 0,
                  message: errorForm.tanggal_pendaftaran[0]
                }
          }} inputValue={(value: string) => setTanggalPendaftaran(value)} />

      </div>

      <div className='flex gap-x-8'>

        <Select data={{label: 'Kantor Pabean', readonly: true, value: data?.ur_pabean_asal || '', name: 'ur_pabean_asal'}}/>

        <Select data={{label: 'SKEP Fasilitas', readonly: true, value: data?.kd_skep_fasilitas || '',  name: 'kd_skep_fasilitas'}}/>
        
        <Select data={{label: 'Jenis PIB', readonly: true, value: data?.jenis_pib || '',  name: 'jenis_pib'}}/>
      </div>

      <div className='flex gap-x-8'>
        <Select data={{label: 'Jenis Impor', readonly: true, value: data?.ur_jenis_impor || '',  name: 'ur_jenis_impor'}}/>

        <Select data={{label: 'Cara Pembayaran', readonly: true, value: data?.ur_cara_bayar || '',  name: 'ur_cara_bayar'}}/>

        <Select data={{label: 'Transaksi', readonly: true, value: data?.ur_transaksi_impor || '',  name: 'ur_transaksi_impor'}}/>
      </div>

    
    </form> 
    : <Loading />
}

export default DataUtama