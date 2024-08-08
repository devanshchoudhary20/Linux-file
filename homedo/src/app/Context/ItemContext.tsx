'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';

type EMPTY_TASK = {
    id : number,
    title: string,
    subtitle : string,
    room: string,
    owner: string,
    isCompleted: boolean,
    startDate : number,
    checklist: [],
    repeat: { frequency: number, dayOfWeek: number, intervals: string },
    reminder: number,
    createdAt: number,
    completionDate: number
}

const emptyTask: EMPTY_TASK = {
    id : 0,
    title: '',
    subtitle : '',
    room: '',
    owner: 'Devansh Choudhary',
    isCompleted: false,
    startDate : 0,
    checklist: [],
    repeat: { frequency: 0, dayOfWeek: 0, intervals: '' },
    reminder: 0,
    createdAt: 0,
    completionDate: 0
};
const ItemContext = createContext<EMPTY_TASK>(emptyTask);

const ItemProvider = ({children}:any) => {
    const [task,setTask] = useState<EMPTY_TASK>(emptyTask);

    useEffect(()=> {
        console.log(task);
    },[task])

    return(
        //@ts-ignore
        <ItemContext.Provider value ={{task,setTask}}>
            {children}
        </ItemContext.Provider>
    );

};

export {ItemContext,ItemProvider} ; 