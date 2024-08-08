'use client'
import React, { useContext, useEffect, useState } from 'react'
import { BiLayer } from 'react-icons/bi';
import { ItemContext } from '@/app/Context/ItemContext';

const AddTaskTitle = ({isEdit,editTask} : any) => {
  const initialTitleValue = !isEdit ? '' : editTask.title 
  const initialSubtitleValue = !isEdit ? '' : editTask.subtitle 
  // debugger;
  
  const [title,setTitle] = useState(initialTitleValue);
  const [subtitle,setSubtitle] = useState(initialSubtitleValue);
  
  const{task,setTask} = useContext(ItemContext);
  
  const handleTitleChange = (e : any) =>{
    setTitle(e.target.value);
    setTask({...task ,title : e.target.value,taskid : Date.now()});
    
  }

  const handleSubtitleChange = (e : any) =>{
    setSubtitle(e.target.value);
    setTask({...task ,subtitle : e.target.value});
  }


  return (
    <div>
        <div className="flex flex-col justify-between items-center ">
            <div className='w-full flex '>
                <input
                type="text"
                placeholder="Title"
                value = {title}
                className="w-full text-lg font-semibold placeholder-gray-400 focus:outline-none p-3 rounded-tl-xl"
                onChange={handleTitleChange}
                required
                />
                <button className="w-full flex items-center text-teal-500 bg-white justify-end pr-3 rounded-tr-xl ">
                    <BiLayer className="w-5 h-5 mr-1" />
                    <span className="text-sm">Use Preset</span>
                </button>
            </div>
            <hr/>
            <input
            type="text"
            placeholder="Notes (Optional)"
            value={subtitle}
            className="w-full text-gray-500 focus:outline-none p-3 rounded-b-xl"
            onChange={handleSubtitleChange}
            />
        </div>
    </div>
  )
}

export default AddTaskTitle