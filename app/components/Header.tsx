import React from 'react'
import reactLogo from '@/public/react-1-logo-svgrepo-com.svg';
import Image from 'next/image';
// import Clock from './Clock';
import { RiNotification2Line } from "react-icons/ri";
import { FaRunning } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { RiArrowLeftSLine } from "react-icons/ri";

const Header = () => {
  return (
    <div>
        <div className='bg-blue-600 p-2 flex justify-between items-center'>
            <Image src={reactLogo} alt='company logo' width={50}></Image>
            
            <div className='flex gap-x-4 items-center'>
                {/* <Clock /> */}
                <RiNotification2Line color='white' size={20}/>
                <div className='rounded-full bg-red-500 p-2 scale-x-[-1]'>
                    <FaRunning size={20}></FaRunning>
                </div>
            </div>
        </div>
        <div className='flex justify-between font-bold p-2 bg-white'>
            <div className='space-x-1'>
                <button className='text-blue-500'>/Beranda</button>
                <span className='text-gray-500'>/SSM OC</span>   
            </div>

            <div className='gap-x-8 flex items-center'>
                <div className='flex gap-x-2 items-center text-blue-500'>
                    <RiArrowLeftSLine size={25}/>
                    <button>Beranda Permohonan</button>
                </div>
                <div className='flex gap-x-2 items-center text-blue-500'>
                    <BiHomeAlt size={18}/>
                    <button>Beranda Menu</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header