'use client'

import { NavState } from '@/types/enums';
import React, { useEffect, useState } from 'react'
import DataUtama from './DataUtama';
import DataEntitas from './DataEntitas';
import DataPungutan from './DataPungutan';
import { NavMenu } from '@/types/UI_Types';
import ApiProvider from '@/libs/api-provider';
import { DataUtamaProp } from '@/types/Data';
import TabButton from './TabButton';

const MainTab = () => {
    const [data, setData] = useState<DataUtamaProp | undefined>(undefined);

    const listNav : NavMenu[] = [{nama: 'Data Utama', state: NavState.UTAMA, comp: <DataUtama data={data}/>}, 
        {nama: 'Data Entitas', state: NavState.ENTITAS, comp: <DataEntitas id_aju={data?.id_aju}/>}, 
        {nama: 'Data Pungutan', state: NavState.PUNGUTAN, comp: <DataPungutan id_aju={data?.id_aju}/>}];
    const [currentState, setCurrentState] = useState(NavState.UTAMA);

    const changeNavState = (state : NavState) => {
        setCurrentState(state)
    };

    useEffect(() => {
        const getDataUtama = async () => {
          const response = await ApiProvider.getDataUtama('20120B388FAE20240402000001');
    
          if(!response.error){
            setData(response.data);
            console.log(response.data)
          }
          else{
            console.log('Cannot Get Api')
          }
        };

        getDataUtama();
      }, [])

    return (
        <div className='space-y-8'> 
           
            <p className='text-2xl font-bold mb-4'>Data Pemberitahuan</p>
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
            <div className='border p-4'>
                {
                    listNav.find(nav => nav.state === currentState)?.comp
                }
            </div>

            <div className='flex gap-x-4 justify-center'>
                <TabButton disabled={currentState === NavState.UTAMA} handleBtnClick={() => changeNavState(currentState - 1)}>Sebelumnya</TabButton>
                <TabButton disabled={currentState === NavState.PUNGUTAN} handleBtnClick={() => changeNavState(currentState + 1)}>Selanjutnya</TabButton>
            </div>
        </div>
    )
}

export default MainTab