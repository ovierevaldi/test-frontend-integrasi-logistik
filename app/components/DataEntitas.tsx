'use client'

import React, { useEffect, useState } from 'react'
import Select from './UI/Select'
import { DataEntitasProp } from '@/types/Data'
import Input from './UI/Input'
import ApiProvider from '@/libs/api-provider'
import Loading from './UI/Loading'
import { JenisEntitas } from '@/types/enums'

type DataEntitasPageProp =  {
  id_aju: string | undefined,
  onSubmit: boolean,
  canNext: (state: boolean, data: {}) => void
}

const DataEntitas = ({id_aju, onSubmit, canNext} :DataEntitasPageProp) => {
  const [data, setData] = useState<DataEntitasProp>();
  const [selectedEntitas, setSelectedEntitas] = useState(JenisEntitas.PENGUSAHA)

  useEffect(() => {
    const getDataUtama = async () => {
      if(id_aju){
        const response = await ApiProvider.getDataEntitas(id_aju);

        if(!response.error){
          setData(response.data);
        }
        else{
          console.log('Cannot Get Api')
        }
      }
    };

    getDataUtama();

  }, [id_aju]);

  useEffect(() => {
    if(onSubmit){
      canNext(true, {npwp_pengaju: data?.npwp_pengaju, ur_entitas_pemberitahu: data?.ur_entitas_pemberitahu})
    }
  }, [onSubmit, canNext]);

  return id_aju ? 
  <div className='space-y-8'>
     <Select data={{label: 'Jenis Pemberitahuan', readonly: true, value: data?.ur_entitas_pemberitahu || ''}}></Select>

    <p className='text-2xl font-bold'>Data Entitas</p>
    <div className='flex gap-x-8 flex-wrap'>
      <Select 
        data={{label: 'Jenis Identitas', readonly: false, value: selectedEntitas || '', options: {label: Object.values(JenisEntitas).map((value) => {
          return value === 'penanggungjawab' ? 'penanggung jawab'.toUpperCase() : value.toUpperCase();
        }), value: Object.values(JenisEntitas)},}}
        valueChanged={(e) => setSelectedEntitas(e as JenisEntitas)}
      ></Select>
      <Input data={{label: 'NIB', readonly: true, type: 'text', value: data?.[selectedEntitas].nib || ''}}/>
      <Input data={{label: 'No Identitas', readonly: true, type: 'text', value: data?.npwp_pengaju || ''}}/>
    </div>

    <div className='flex gap-x-8'>
      <Input data={{label: 'No Identitas (16 Digit)', readonly: true, type: 'text', value: data?.[selectedEntitas]?.id_entitas || ''}}/>
      <Input data={{label: 'Nama Perusahaan', readonly: true, type: 'text', value: data?.[selectedEntitas]?.nama_identitas || ''}}/>
    </div>


    <div className='flex flex-wrap gap-x-8 gap-y-4'>
      <Select data={{label: 'Provinsi', readonly: true, value: data?.[selectedEntitas]?.provinsi_identitas || ''}}></Select>
      <Input data={{label: 'Kota/Kabupaten', readonly: true, type: 'text', value: data?.[selectedEntitas]?.kota_identitas || ''}}/>
      <Input data={{label: 'Kecamatan', readonly: true, type: 'text', value: data?.[selectedEntitas]?.kecamatan || ''}}/>
      <Input data={{label: 'Kode Pos', readonly: true, type: 'text', value: data?.[selectedEntitas]?.kode_pos || ''}}/>
      <Input data={{label: 'RT / RW', readonly: true, type: 'text', value: data?.[selectedEntitas]?.rt_rw || ''}}/>
    </div>

    <div className='flex gap-x-8 flex-wrap gap-y-4'>
      <Input data={{label: 'Telephone', readonly: true, type: 'text', value: data?.[selectedEntitas].tlp_identitas || ''}}/>
      <Input data={{label: 'Email', readonly: true, type: 'text', value: data?.[selectedEntitas].email_identitas || ''}}/>
      <Input data={{label: 'Status', readonly: true, type: 'text', value: data?.[selectedEntitas].status || ''}}/>
    </div>

  </div> : <Loading />
}

export default DataEntitas