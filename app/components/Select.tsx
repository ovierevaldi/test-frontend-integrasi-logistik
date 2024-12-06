import { SelectMenu } from '@/types/UI_Types'
import React from 'react'

const Select = ({data} : {data: SelectMenu}) => {
  return (
    <div className='flex flex-col w-1/3'>
        <span className='font-bold'>{data.label}</span>
        <select 
            disabled={data.disabled}
            className='p-2 disabled:bg-gray-300 rounded border-2'
            
        >
            <option>{data.value}</option>
            {
                data.options.map((value) => <option>{value}</option>)
            }
          
        </select>
    </div>
  )
}

export default Select