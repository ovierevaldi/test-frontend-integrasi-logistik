import React from 'react'

type TabButtonProp = {
    children: React.ReactNode, 
    disabled: boolean, 
    handleBtnClick: () => void,
    bgColor?: string, 
    textColor?: string 
}

const TabButton = ({children, disabled, handleBtnClick, bgColor, textColor} : TabButtonProp) => {
    const onBtnClick = () => {
        handleBtnClick();
    }
  return (
    <button
        onClick={onBtnClick}
        disabled={disabled}
        className={`p-2 border-blue-500 rounded-lg text-blue-500 hover:text-white disabled:border-gray-500 disabled:text-gray-500 ${disabled ? '' : 'hover:bg-blue-500 '} ${bgColor === 'yellow' ? `bg-yellow-500 border-0` : bgColor === 'blue' ? 'bg-blue-500 border-0' : 'border-2'} ${textColor ? 'text-white': ''} `}>
        {children}
    </button>
  )
}

export default TabButton