import React, {useContext,createContext,useState,useEffect} from 'react'
import { initialState } from '../State/InitialState';
import {db} from '@/fireabase/FirebaseConfig'
import { collection, getDoc, addDoc, doc, getDocs,  } from 'firebase/firestore';

const SettingContext = createContext(null);

export const SettingProvider = ({children}: any) => {


    // const LoadState = async () =>{
    //     const savedstate = await getDocs();
    //     // console.log(savedstate.docs);
    //     // debugger
    //     // const savedstate = localStorage.getItem('tasksState');
    //     return savedstate.docs.length? savedstate.docs : initialState;
    // }
    // debugger
    const [state, setState] = useState('');
    
    useEffect(()=> {
        localStorage.setItem('tasksState',JSON.stringify(state));
        // localStorage.getItem('tasksState');
    },[state])

    return (
        <SettingContext.Provider value={{state,setState}}>
            {children}
        </SettingContext.Provider>
    )
};

export const useSettings = () => useContext(SettingContext);
