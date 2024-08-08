'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {FaChevronRight} from 'react-icons/fa'
import { useSettings } from '@/app/Context/GlobalContext';
import { useUser } from '@/fireabase/Context/UserContext';
import { getAllTasks } from '@/fireabase/tasksActions';

const CompletedTask = () => {
    const {user,placeid,setPlaceid} = useUser()
    const [isCompleted,setIsCompleted] = useState(false);
    const router = useRouter();
    const {state,setState} = useSettings();
    const handleClick = (path : any) => {
    router.push(path);
    setIsCompleted(!isCompleted);
  };

  const filteredTask = (async () => {
    const tasks = await getAllTasks(user.uid,placeid)
    const filteredTask = tasks.filter((task :any)=>task.isCompleted===true);
    return filteredTask
  })
  // debugger
  return (
    <div>
        <div className="bg-white p-3 rounded-xl shadow-sm flex justify-between items-center ">
            <span className="font-semibold text-lg">Completed Tasks</span>
            <span className="text-gray-400 flex items-center">
            {filteredTask.length}
            <FaChevronRight className="w-5 h-5 ml-1" onClick ={() =>{handleClick('/home/completedTask')}}/>
            </span>
        </div>
    </div>
  )
}

export default CompletedTask;