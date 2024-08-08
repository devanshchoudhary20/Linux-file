'use client'
import NavigationHeader from '@/app/Components/TasksComponents/NavigationHeader'
import React, { useState } from 'react'
import { FiMenu } from 'react-icons/fi';
import { BsClipboardCheck } from "react-icons/bs";
import BottomNav from '@/app/Components/BottomNav';
import AddTask from '@/app/Components/TasksComponents/AddTask';
import { ItemProvider } from '@/app/Context/ItemContext';
import TaskList from '@/app/Components/AllTask/Tasks';
import { SettingProvider, useSettings } from '@/app/Context/GlobalContext';

const AllTask = () => {

  const [isEmpty,setIsEmpty] = useState(false);
  const {state,setState} = useSettings();

  if(state.length >0){setIsEmpty(false)}


  return (
      <div className='bg-blue-50 h-full flex flex-col flex-grow justify-between'>
        <NavigationHeader />
        <div className="flex flex-col flex-grow mt-4">
          <h1 className='text-3xl font-bold mb-4 flex items-center ml-4'> All Task</h1>    
          <div className="flex p-4 bg-blue-50">
            <div className="bg-[#e6f7f5] px-4 py-1 rounded-xl mr-2 font-medium border border-gray-300">Me</div>
            <div className="bg-[#e6f7f5] px-4 py-1 rounded-xl flex items-center justify-center border border-gray-300">
            <FiMenu className="w-5 h-5 text-teal-600" />              
            </div>
          </div>
          {
            isEmpty && 
            (
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="text-gray-400 mb-4">
                <img className="w-32 h-32 mx-auto opacity-40" src = './../checklist.png'/>
                </div>
                <p className="text-gray-400 text-lg">Create your first task</p>
          </div>
            )
          }
          {
            !isEmpty &&
            (
                <TaskList />
            )
          }
          
        </div>
        <AddTask />
        <BottomNav />
      </div>
  )
}

export default AllTask