import { InputMenu } from '@/types/UI_Types'
import React, { useEffect, useState } from 'react'

const Input = ({data, inputValue, checkValue} : {data: InputMenu, inputValue?: (value: string) => void, checkValue?: (value: boolean) => void }) => {
  
  const [isDisabled, setIsDisabled] = useState(false);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement>  = (e) => {
    if(inputValue){
      inputValue(e.target.value)
    }
  };

  const onChecboxValueChanged : React.ChangeEventHandler<HTMLInputElement> = (e) => {
      setIsDisabled(!e.target.checked);
      if(checkValue){
        checkValue(e.target.checked)
      }
  };

  useEffect(() => {
    setIsDisabled(data.disabled)
  },
  [data.disabled])

  return (
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
            onChange={isDisabled ? () => {} : onInputChange}
            disabled={isDisabled}
            placeholder={data.placeholder}
            className='p-2 disabled:bg-gray-300 rounded border-2'
        />
    </div>
  )
}

export default Input