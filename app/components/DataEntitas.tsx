'use client'

import React, { useEffect, useState } from 'react'
import Select from './Select'
import { DataEntitasProp } from '@/types/Data'
import Input from './Input'
import ApiProvider from '@/libs/api-provider'
import Loading from './Loading'
import { JenisEntitas } from '@/types/enums'

const DataEntitas = ({id_aju} : {id_aju: string | undefined}) => {
  const [data, setData] = useState<DataEntitasProp>();
  const [selectedEntitas, setSelectedEntitas] = useState(JenisEntitas.PENGUSAHA)

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
     <Select data={{label: 'Jenis Pemberitahuan', disabled: true, value: data?.ur_entitas_pemberitahu || ''}}></Select>

    <p className='text-2xl font-bold'>Data Entitas</p>
    <div className='flex gap-x-8'>
      <Select 
        data={{label: 'Jenis Identitas', disabled: false, value: selectedEntitas || '', options: {label: Object.values(JenisEntitas).map((value) => {
          return value === 'penanggungjawab' ? 'penanggung jawab'.toUpperCase() : value.toUpperCase();
        }), value: Object.values(JenisEntitas)},}}
        valueChanged={(e) => setSelectedEntitas(e as JenisEntitas)}
      ></Select>
      <Input data={{label: 'NIB', disabled: true, type: 'text', value: data?.[selectedEntitas].nib || ''}}/>
      <Input data={{label: 'No Identitas', disabled: true, type: 'text', value: data?.npwp_pengaju || ''}}/>
    </div>

    <div className='flex gap-x-8'>
      <Input data={{label: 'No Identitas (16 Digit)', disabled: true, type: 'text', value: data?.[selectedEntitas]?.id_entitas || ''}}/>
      <Input data={{label: 'Nama Perusahaan', disabled: true, type: 'text', value: data?.[selectedEntitas]?.nama_identitas || ''}}/>
    </div>


    <div className='flex flex-wrap gap-x-8 gap-y-4'>
      <Select data={{label: 'Provinsi', disabled: true, value: data?.[selectedEntitas]?.provinsi_identitas || ''}}></Select>
      <Input data={{label: 'Kota/Kabupaten', disabled: true, type: 'text', value: data?.[selectedEntitas]?.kota_identitas || ''}}/>
      <Input data={{label: 'Kecamatan', disabled: true, type: 'text', value: data?.[selectedEntitas]?.kecamatan || ''}}/>
      <Input data={{label: 'Kode Pos', disabled: true, type: 'text', value: data?.[selectedEntitas]?.kode_pos || ''}}/>
      <Input data={{label: 'RT / RW', disabled: true, type: 'text', value: data?.[selectedEntitas]?.rt_rw || ''}}/>
    </div>

    <div className='flex gap-x-8'>
      <Input data={{label: 'Telephone', disabled: true, type: 'text', value: data?.[selectedEntitas].tlp_identitas || ''}}/>
      <Input data={{label: 'Email', disabled: true, type: 'text', value: data?.[selectedEntitas].email_identitas || ''}}/>
      <Input data={{label: 'Status', disabled: true, type: 'text', value: data?.[selectedEntitas].status || ''}}/>
    </div>

  </div> : <Loading />
}

export default DataEntitas