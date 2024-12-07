import Input from './Input'
import { DataUtamaProp } from '@/types/Data'
import Select from './Select'
import Loading from './Loading'
import { useState } from 'react'
import RandomButton from './RandomButton'
import {generateUUID, getDateInString} from '@/libs/helper'

const DataUtama = ({data} : {data: DataUtamaProp | undefined}) => {

  const [nomorPendaftaran, setNomorPendaftaran] = useState('');
  const [tanggalPendaftaran, setTanggalPendaftaran] = useState(getDateInString());

  return data ? 
    <div className='space-y-8'>
      <p className='text-2xl font-bold mb-4'>Data Pemberitahuan</p>

      <div className='flex gap-x-8 flex-wrap gap-y-4'>
          <Input data={{label: 'Nomer Pengajuan', disabled: true, type: 'text', value: data?.nomor_pengajuan || ''}}/>
          <Input data={{label: 'Tanggal Pengajuan', disabled: true, type: 'text', value: data?.tanggal_pengajuan || ''}}/>
          <div className='flex items-center gap-x-2'>
            <Input 
              data={{label: 'Nomer Pendaftaran', disabled: false, type: 'text', value: nomorPendaftaran, placeholder: 'Nomor Pendaftaran'}} 
              inputValue={(value: string) => setNomorPendaftaran(value)} 
            />

            <div className='h-fit translate-y-1/3'>
              <RandomButton onBtnClick={() => setNomorPendaftaran(generateUUID())}/>
            </div>
           
          </div>
          <Input data={{label: 'Tanggal Pendaftaran', disabled: false, type: 'date', value: tanggalPendaftaran, placeholder: 'Tanggal Pendaftaran'}} inputValue={(value: string) => setTanggalPendaftaran(value)} />
      </div>

      <div className='flex gap-x-8'>
        <Select data={{label: 'Kantor Pabean', disabled: true, value: data?.ur_pabean_asal || ''}}/>
        <Select data={{label: 'SKEP Fasilitas', disabled: true, value: data?.kd_skep_fasilitas || ''}}/>
        <Select data={{label: 'Jenis PIB', disabled: true, value: data?.jenis_pib || ''}}/>
      </div>

      <div className='flex gap-x-8'>
        <Select data={{label: 'Jenis Impor', disabled: true, value: data?.ur_jenis_impor || ''}}/>
        <Select data={{label: 'Cara Pembayaran', disabled: true, value: data?.ur_cara_bayar || ''}}/>
        <Select data={{label: 'Transaksi', disabled: true, value: data?.ur_transaksi_impor || ''}}/>
      </div>

    
    </div> 
    : <Loading />
}

export default DataUtama