'use client'

import React, { useState } from 'react'
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { FaPlaneDeparture } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { FaBoxes } from "react-icons/fa";
import { AiFillCustomerService } from "react-icons/ai";

const ListMenu = () => {
    const listMenu = [
        { icon: PiBuildingOfficeDuotone, label: "Pemberitahuan" },
        { icon: FaPlaneDeparture, label: "Transportasi" },
        { icon: CgNotes, label: "Dokumen" },
        { icon: FaBoxes, label: "Komodasi" },
        { icon: AiFillCustomerService, label: "Layanan" },
    ];

    const [selectedMenu, setSelectedMenu] = useState(listMenu[0].label)

    const changeCurrentMenu = (label: string) => {
        setSelectedMenu(label)
    }

  return (
    <div className='space-y-8'>
        <div className='flex gap-x-16 justify-center'>
        {
            listMenu.map(menu => {
                const IconComponent = menu.icon;

                return(
                    <div key={menu.label}>
                        <button
                            onClick={() => changeCurrentMenu(menu.label)} 
                            className='cursor-pointer hover:scale-105 duration-100 transition-transform'>
                            <IconComponent size={100} color={menu.label === selectedMenu ? 'blue' : 'black'}/>
                        </button>
                        <p className={`text-center ${menu.label === selectedMenu ? 'font-bold text-orange-500' : ''}`}>
                            {menu.label}
                        </p>
                    </div>
                )
            })
        }

        </div>
    </div>
  )
}

export default ListMenu