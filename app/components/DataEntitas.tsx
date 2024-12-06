'use client'

import React, { useEffect, useState } from 'react'
import Select from './Select'
import { DataEntitasProp } from '@/types/Data'
import Input from './Input'
import ApiProvider from '@/libs/api-provider'
import Loading from './Loading'

const DataEntitas = ({id_aju} : {id_aju: string | undefined}) => {
  const [data, setData] = useState<DataEntitasProp>();

  useEffect(() => {
    const getDataUtama = async () => {
      if(id_aju){
        const response = await ApiProvider.getDataEntitas(id_aju);

        if(!response.error){
          console.log(response)
          setData(response.data);
        }
        else{
          console.log('Cannot Get Api')
        }
      }
    };

    getDataUtama();

  }, [id_aju])

  return id_aju ? 
  <div className='space-y-8'>
    <Select data={{label: 'Jenis Pemberitahuan', disabled: false, value: data?.ur_entitas_pemberitahu || '', options: [],}}></Select>

    <p className='text-2xl font-bold'>Data Pemberitahuan</p>

    <div className='flex'>
      <Select data={{label: 'Jenis Identitas', disabled: false, value: '', options: [],}}></Select>
      <Input data={{label: 'NIB', disabled: true, type: 'string', value: data?.pengusaha.nib || ''}}/>
      <Input data={{label: 'No Identitas', disabled: true, type: 'string', value: data?.npwp_pengaju || ''}}/>
    </div>

    <div className='flex'>
      <Input data={{label: 'No Identitas (16 Digit)', disabled: true, type: 'string', value: data?.pengusaha.id_entitas || ''}}/>
      <Input data={{label: 'Nama Perusahaan', disabled: true, type: 'string', value: data?.pengusaha.nama_identitas || ''}}/>
    </div>


    <div className='flex flex-wrap'>
      <Select data={{label: 'Provinsi', disabled: false, value: data?.pengusaha.provinsi_identitas || '', options: [],}}></Select>
      <Input data={{label: 'Kota/Kabupaten', disabled: true, type: 'string', value: data?.pengusaha.kota_identitas || ''}}/>
      <Input data={{label: 'Kecamatan', disabled: true, type: 'string', value: data?.pengusaha.kecamatan || ''}}/>
      <Input data={{label: 'Kode Pos', disabled: true, type: 'string', value: data?.pengusaha.kode_pos || ''}}/>
      <Input data={{label: 'RT / RW', disabled: true, type: 'string', value: data?.pengusaha.rt_rw || ''}}/>
    </div>

    <div className='flex'>
      <Input data={{label: 'Telephone', disabled: true, type: 'string', value: data?.pengusaha.tlp_identitas || ''}}/>
      <Input data={{label: 'Email', disabled: true, type: 'string', value: data?.pengusaha.email_identitas || ''}}/>
      <Input data={{label: 'Status', disabled: true, type: 'string', value: data?.pengusaha.status || ''}}/>
    </div>

  </div> : <Loading />
}

export default DataEntitas