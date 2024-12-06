import { InputMenu } from '@/types/UI_Types'
import React from 'react'

const Input = ({data} : {data: InputMenu}) => {
  return (
    <div className='flex flex-col w-1/4'>
        <span className='font-bold'>{data.label}</span>
        <input 
            type={data.type}
            value={data.value}
            disabled={data.disabled}
            placeholder={data.placeholder}
            className='p-2 disabled:bg-gray-300 rounded border-2'
        />
    </div>
  )
}

export default Input