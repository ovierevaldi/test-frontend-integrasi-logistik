import React, { useEffect, useState } from 'react'
import Input from './Input'
import ApiProvider from '@/libs/api-provider'
import { DataUtamaProp } from '@/types/Data'
import Select from './Select'

const DataUtama = () => {
  const [data, setData] = useState<DataUtamaProp>()

  useEffect(() => {
    const getDataUtama = async () => {
      const response = await ApiProvider.getDataUtama();

      if(!response.error){
        console.log(response.data)
       setData(response.data);
      }
      else{
        console.log('Cannot Get Api')
      }
    };

    getDataUtama();
  }, [])
    
  return (
    <div className='space-y-8'>
      <div className='flex gap-x-8'>
          <Input data={{label: 'Nomer Pengajuan', disabled: true, type: 'string', value: data?.nomor_pengajuan || ''}}/>
          <Input data={{label: 'Tanggal Pengajuan', disabled: true, type: 'string', value: data?.tanggal_pengajuan || ''}}/>
          <Input data={{label: 'Nomer Pendaftaran', disabled: true, type: 'string', value: data?.nomor_pendaftaran || '', placeholder: 'Nomor Pendaftaran'}}/>
          <Input data={{label: 'Tanggal Pendaftaran', disabled: true, type: 'string', value: data?.tanggal_pendaftaran || '', placeholder: 'Tanggal Pendaftaran'}}/>
      </div>

      <div className='flex gap-x-8'>
        <Select data={{label: 'Kantor Pabean', disabled: false, value: data?.ur_pabean_asal || 'dwadwd', options: [],}}/>
        <Select data={{label: 'SKEP Fasilitas', disabled: true, value: data?.kd_skep_fasilitas || '', options: []}}/>
        <Select data={{label: 'Jenis PIB', disabled: true, value: data?.jenis_pib || '', options: []}}/>
      </div>

      <div className='flex gap-x-8'>
        <Select data={{label: 'Jenis Impor', disabled: true, value: data?.ur_jenis_impor || '', options: []}}/>
        <Select data={{label: 'Cara Pembayaran', disabled: true, value: data?.ur_cara_bayar || '', options: []}}/>
        <Select data={{label: 'Transaksi', disabled: true, value: data?.ur_transaksi_impor || '', options: []}}/>
      </div>

      <div className='flex gap-x-4 justify-center'>
          <button className='p-2 border-blue-500 border-2 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white'>Sebelumnya</button>
          <button className='p-2 border-blue-500 border-2 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white'>Selanjutnya</button>
      </div>
    </div>
  )
}

export default DataUtama