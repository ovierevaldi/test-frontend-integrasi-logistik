'use client'

import React, { useEffect, useState } from 'react'
import Input from './Input'
import ApiProvider from '@/libs/api-provider'
import { DataUtamaProp } from '@/types/Data'
import Select from './Select'
import Loading from './Loading'

const DataUtama = ({data} : {data: DataUtamaProp | undefined}) => {
  return data ? 
    <div className='space-y-8'>
      <p className='text-2xl font-bold mb-4'>Data Pemberitahuan</p>

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

    
    </div> 
    : <Loading />
}

export default DataUtama