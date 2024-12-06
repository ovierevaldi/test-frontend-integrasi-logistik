'use client'

import React, { useEffect, useState } from 'react'
import Input from './Input'
import { DataPungutanProp } from '@/types/Data'
import ApiProvider from '@/libs/api-provider'
import Select from './Select'
import TabButton from './TabButton'

const DataPungutan = ({id_aju} : {id_aju: string | undefined}) => {
  const [data, setData] = useState<DataPungutanProp>();

  const cekKelengkapanData = () => {

  };

  const simpanData = () => {

  }

  useEffect(() => {
    const getDataUtama = async () => {
      if(id_aju){
        const response = await ApiProvider.getDataPungutan(id_aju);

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

  return (
    <div className='space-y-8'>
      <div className='flex'>
        <Input data={{label: 'Nomer Pengajuan', disabled: true, type: 'string', value: ''}}/>
        <Select data={{label: 'Valuta', disabled: false, value: data?.ur_valuta || '', options: [],}}></Select>
        <Input data={{label: 'Kurs', disabled: true, type: 'string', value: ''}}/>
      </div>

      <div className='flex'>
        <Input data={{label: 'Nilai', disabled: true, type: 'string', value: data?.nilai_incoterm || ''}}/>
        <Input data={{label: 'Tambahan', disabled: true, type: 'string', value: data?.biaya_tambahan || ''}}/>
        <Input data={{label: 'Voluntary Declaration', disabled: true, type: 'string', value: data?.biaya_pengurang || ''}}/>
        <Input data={{label: 'Nilai FOB', disabled: true, type: 'string', value: data?.fob || ''}}/>
      </div>

      <div className='flex'>
        <Input data={{label: 'Asuransi Bayar Di', disabled: true, type: 'string', value: data?.ur_asuransi || ''}}/>
        <Input data={{label: 'Asuransi', disabled: true, type: 'string', value: data?.nilai_asuransi || ''}}/>
        <Input data={{label: 'Freight', disabled: true, type: 'string', value: data?.freight || ''}}/>
      </div>


      <div className='flex flex-wrap'>
        <Input data={{label: 'CIF', disabled: true, type: 'string', value: data?.nilai_pabean || ''}}/>
        <Input data={{label: 'CIF Rp', disabled: true, type: 'string', value: data?.nilai_pabean_idr || ''}}/>
        <Input data={{label: 'Bruto', disabled: true, type: 'string', value: data?.berat_kotor || ''}}/>
        <Input data={{label: 'Netto', disabled: true, type: 'string', value: data?.berat_bersih || ''}}/>
        <Input data={{label: 'Flag Kontainer', disabled: true, type: 'string', value: data?.ur_flag_curah || ''}}/>
      </div>

      <div className='flex gap-x-4 justify-center'>
          <TabButton disabled={false} handleBtnClick={cekKelengkapanData} bgColor='yellow' textColor='true'>Kelengkapan Data</TabButton>
          <TabButton disabled={false} handleBtnClick={simpanData} bgColor='blue' textColor='true'>Simpan</TabButton>
      </div>
    </div>
  )
}

export default DataPungutan