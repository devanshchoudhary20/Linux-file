import react, { createContext, useState, useEffect, useContext} from 'react';
import initialState from './State';
import { saveToLocalStorage,getItemFromLocalStorage } from './LocalStorageHelper';

const settingContext = createContext();

const SettingProvider = ({children}) => {
    const [settingState,setSettingState] = useState(()=>{
        const state = getItemFromLocalStorage("settingState");
        if(!state?.length){
            saveToLocalStorage("settingState",initialState);
            return initialState;
        }
        else{
            return state;
        }
    })

    useEffect(()=>{
        saveToLocalStorage("settingState",settingState);
    },[settingState])

    return (
        <settingContext.Provider value ={{settingState , setSettingState}}>
            {children}
        </settingContext.Provider>
    )
}

export const useSetting = () => useContext(SettingProvider);