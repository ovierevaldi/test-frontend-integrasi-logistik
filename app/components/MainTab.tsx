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

const MainTab = ({id_aju} : {id_aju: string}) => {
    const [data, setData] = useState<DataUtamaProp | undefined>(undefined);

    const listNav : NavMenu[] = [{nama: 'Data Utama', state: NavState.UTAMA, comp: <DataUtama data={data}/>}, 
        {nama: 'Data Entitas', state: NavState.ENTITAS, comp: <DataEntitas id_aju={data?.id_aju}/>}, 
        {nama: 'Data Pungutan', state: NavState.PUNGUTAN, comp: <DataPungutan id_aju={data?.id_aju}/>}];
    const [currentState, setCurrentState] = useState(NavState.UTAMA);

    const [isLoadData, setIsLoadData] = useState(false);
    const [isNoData, setIsNoData] = useState(false);

    const changeNavState = (state : NavState) => {
        if(!isNoData)
            setCurrentState(state)
    };

    useEffect(() => {
        const getDataUtama = async () => {
            setIsLoadData(true);

            const response = await ApiProvider.getDataUtama(id_aju);

            if(response.code === "404"){
                setIsLoadData(false);
                setIsNoData(true);
                return;
            }

            if(!response.error){
                setData(response.data);
            }
            else{
                console.log('Cannot Get Api')
            };

            setIsNoData(false);
            setIsLoadData(false);
        };

        getDataUtama();
      }, [id_aju]);

    return (
        <div className='space-y-4'> 
            <p className='text-right font-bold py-4'>
                No Pengajuan: <span>{id_aju}</span>
            </p>
            <p className='text-2xl font-bold mb-4'>Data Pemberitahuan</p>
            <div className="flex gap-x-4">
                {
                    listNav.map((nav) => 
                        <button 
                            key={nav.nama}
                            onClick={() => changeNavState(nav.state)}
                            className='p-3 rounded-lg border'>
                            {nav.nama}
                        </button>
                    )
                }
            </div>
            {
                !id_aju && <div>
                    <p className='text-2xl font-bold text-center py-8'>Please Input ID Ajuan</p>
                    <p className='text-center italic'>Cth: <span className='text-blue-500'>http://your-url/20120B388FAE20240402000001</span></p>
                </div>
            }

            {
                id_aju && 
                <>
                    {
                        isLoadData && <p>Loading Data...</p>
                    }
                    {
                        isNoData && <p className='text-2xl font-bold text-center code: 404'>Data Not Found</p>
                    }
                    {
                        !isNoData && 
                        <>
                        
                        <div className='border p-4'>
                            {
                                listNav.find(nav => nav.state === currentState)?.comp
                            }
                        </div>

                        <div className='flex gap-x-4 justify-center'>
                            <TabButton disabled={currentState === NavState.UTAMA} handleBtnClick={() => changeNavState(currentState - 1)}>Sebelumnya</TabButton>
                            <TabButton disabled={currentState === NavState.PUNGUTAN} handleBtnClick={() => changeNavState(currentState + 1)}>Selanjutnya</TabButton>
                        </div>
                    </>
                    }
                </>
            }
            
        </div>
    )
}

export default MainTab