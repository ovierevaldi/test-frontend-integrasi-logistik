'use client'

import { NavState } from '@/types/enums';
import React, { useState } from 'react'
import DataUtama from './DataUtama';
import DataEntitas from './DataEntitas';
import DataPungutan from './DataPungutan';
import { NavMenu } from '@/types/UI_Types';

const MainTab = () => {
    const listNav : NavMenu[] = [{nama: 'Data Utama', state: NavState.UTAMA, comp: <DataUtama />}, 
        {nama: 'Data Entitas', state: NavState.ENTITAS, comp: <DataEntitas />}, 
        {nama: 'Data Pungutan', state: NavState.PUNGUTAN, comp: <DataPungutan />}];
    const [currentState, setCurrentState] = useState(NavState.UTAMA)

    const changeNavState = (state : NavState) => {
        setCurrentState(state)
    }

    return (
        <div> 
            <div className="flex">
                {
                    listNav.map((nav) => 
                        <button 
                            key={nav.nama}
                            onClick={() => changeNavState(nav.state)}
                            className='p-4 rounded-lg border'>
                            {nav.nama}
                        </button>
                    )
                }
            </div>
            {
                listNav.find(nav => nav.state === currentState)?.comp
            }
        </div>
    )
}

export default MainTab