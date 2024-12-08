import { InputMenu } from '@/types/UI_Types'
import React, { useEffect, useState } from 'react'

const Input = ({data, inputValue, checkValue} : {data: InputMenu, inputValue?: (value: string) => void, checkValue?: (value: boolean) => void }) => {
  const [isReadOnly, setIsReadOnly] = useState(false);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement>  = (e) => {
    if(inputValue){
      inputValue(e.target.value)
    }
  };

  const onChecboxValueChanged : React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsReadOnly(!e.target.checked);
      if(checkValue){
        checkValue(e.target.checked)
      }
  };

  useEffect(() => {
    setIsReadOnly(data.readonly)
  },
  [data.readonly])

  return (
    <div>
      <div className='flex flex-col'>
        <div className='flex gap-x-2'>
          <span className='font-bold'>{data.label}</span>
          {
            data.controlDisable && <input type='checkbox' onChange={onChecboxValueChanged}></input>
          }
        </div>
        <input 
            type={data.type}
            value={data.value}
            name={data.name}
            onChange={isReadOnly ? () => {} : onInputChange}
            readOnly={isReadOnly}
            placeholder={data.placeholder}
            className={`p-2 disabled:bg-gray-300 rounded border-2 ${data.error?.isError ? 'border-red-500' : ''}`}
        />
      </div>
      {
        data.error?.isError && <p className='text-sm text-red-500'>{data.error.message}</p>
      }
    </div>
  )
}

export default Input