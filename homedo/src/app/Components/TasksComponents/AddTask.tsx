'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { IoChevronBackOutline, IoAddOutline } from "react-icons/io5";
import TaskCreation from '../NewTaskComponents/TaskCreation';

const AddTask = () => {
  const [isClicked,setIsClicked] = useState(false)
  
  const handleClick = () => {
    setIsClicked(!isClicked);
  }
  return (
    <div>
      <div className="fixed bottom-20 right-4" onClick = {handleClick}>
        <button className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-xl">
          <IoAddOutline className="w-8 h-8 text-white" />
        </button>
      </div>
      {isClicked && 
      (
        <TaskCreation 
        setIsEdit = {setIsClicked} 
        isEdit ={false} 
        task = ''
      />
      )
      }
    </div>
  )
}

export default AddTask