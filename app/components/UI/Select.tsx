import { SelectMenu } from '@/types/UI_Types'
import React from 'react'

const Select = ({data, valueChanged} : {data: SelectMenu, valueChanged?: (new_value: string) => void}) => {

  const onSelectValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if(valueChanged)
        valueChanged(e.target.value)
  }

  return (
    <div className='flex flex-col w-1/3'>
        <span className='font-bold'>{data.label}</span>
        <select 
            aria-readonly={data.readonly}
            className='p-2 disabled:bg-gray-300 rounded border-2'
            onChange={onSelectValueChange}
            name={data.name}
            value={data.value}
        >
            {
              !data.options ?
              <option>
                {data.value}
              </option>

              :

              data.options.value.map((v, index) => 
                <option key={v} value={v}>
                  {data.options?.label[index]}
                </option>)
            }
          
        </select>
    </div>
  )
}

export default Select