'use client'

import { NavState } from '@/types/enums';
import React, { useEffect, useState } from 'react'
import DataUtama from './DataUtama';
import DataEntitas from './DataEntitas';
import DataPungutan from './DataPungutan';
import { NavMenu } from '@/types/UI_Types';
import ApiProvider from '@/libs/api-provider';
import { DataUtamaProp, DataUtamaReport } from '@/types/Data';
import TabButton from './TabButton';
import toast from 'react-hot-toast';

const MainTab = ({id_aju} : {id_aju: string}) => {
    const [data, setData] = useState<DataUtamaProp | undefined>(undefined);

    const [isSubmit1, setIsSubmit1] = useState(false);
    const [isSubmit2, setIsSubmit2] = useState(false);
    const [isSubmit3, setIsSubmit3] = useState(false);
    const [savedData, setSavedData] = useState<DataUtamaReport>({cif_in_rp: 0, nilai_cif: 0, nilai_fob: 0, nomor_pendaftaran: '', nomor_pengajuan: '', npwp_pengaju: '', tanggal_pendaftaran: '', ur_entitas_pemberitahu: '', valuta_code: '', voluntaryDeclaration: 0});
    const [canSaveData, setCanSaveData] = useState(false);
    const [currentState, setCurrentState] = useState(NavState.UTAMA);
    const [isLoadData, setIsLoadData] = useState(false);
    const [isNoData, setIsNoData] = useState(false);
    const listNav : NavMenu[] = [
        {nama: 'Data Utama', state: NavState.UTAMA, comp: <DataUtama data={data} onSubmit={isSubmit1} canNext={(value, data) => {
            if(value){
                setSavedData((prev) => {
                    return {...prev, ...data}
                })
                changeNavState(NavState.ENTITAS);
            } 
            else setIsSubmit1(false)}}/>}, 

        {nama: 'Data Entitas', state: NavState.ENTITAS, comp: <DataEntitas onSubmit={isSubmit2} 
        id_aju={data?.id_aju} 
        canNext={(result, data) => {
            if(result){
                setSavedData((prev) => {
                    return {...prev, ...data}
                });
                changeNavState(NavState.PUNGUTAN);
               
            }
            setIsSubmit2(false);
        }}/>}, 

        {nama: 'Data Pungutan', state: NavState.PUNGUTAN, comp: <DataPungutan id_aju={data?.id_aju} 
        canNext={(result, data) => {
            if(result){
                setSavedData((prev) => {
                    return {...prev, ...data}
                });
                setCanSaveData(true);
                setIsSubmit3(false);
            }
        }} 
        onSubmit={isSubmit3}/>}
    ];
   
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

    useEffect(() => {
        if(canSaveData){
            postData();
        }
    }, [canSaveData])

    const changeNavState = (state : NavState) => {
        if(!isNoData){
            setCurrentState(state)
        }
    };

    const onNextBtnClicked = (state: NavState) => {
        
        if(state === NavState.UTAMA)
            return setIsSubmit1(true);
        
        if(state === NavState.ENTITAS)
            return setIsSubmit2(true);

        if(state === NavState.PUNGUTAN)
            return setIsSubmit3(true);
    }

    const postData = async () => {
        try {
            const currentData = await ApiProvider.getDataReportByNomorPengajuan(savedData.nomor_pengajuan);

            if(currentData){
                const response = await ApiProvider.updateDataUtamaReport(savedData, currentData[0]._id);
                if(!response.error){
                    toast.success('Data already exsist, \n Data will be updated insted of createing a new one');
                }
                else{
                    toast.error('Cannot Update Data')
                }
            }
            else{
                const response = await ApiProvider.createDataUtamaReport(savedData);
                if(!response.error){
                    toast.success('Success Save Data');
                }
                else{
                    toast.success('Data already exsist, \n Data will be updated insted of createing a new one')
                }
    
            }
        } catch (error) {
            toast.error('Cannot Save Data');            
        }
    }

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
                            <TabButton 
                            disabled={currentState === NavState.PUNGUTAN} handleBtnClick={() => onNextBtnClicked(currentState)}>Selanjutnya</TabButton>
                        </div>
                    </>
                    }
                </>
            }
            
        </div>
    )
}

export default MainTab