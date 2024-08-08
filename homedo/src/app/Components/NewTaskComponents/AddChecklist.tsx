'use client'
import React, { useState } from 'react'
import { IoCheckboxOutline} from 'react-icons/io5';
import { MdOutlineNavigateNext } from "react-icons/md";
import Checklist from './Checklist';

const AddChecklist = ({isEdit,editTask}) => {
  const [isClicked, setIsClicked] = useState(false)
  const handleClick = ()=>{
    setIsClicked(!isClicked);
  }
  return (
    <div>
        <div className="flex items-center justify-between py-3 px-1 bg-white h-14 rounded-xl">
            <div className="flex items-center">
              <IoCheckboxOutline className="w-5 h-5 text-purple-500 mr-3" />
              <span className="text-purple-500">Add Checklist</span>
            </div>
            <MdOutlineNavigateNext className="w-8 h-8 text-gray-400" onClick={handleClick}/>
        </div>
        {
          isClicked &&
          <>
            <Checklist 
            isEdit = {isEdit}
            editTask = {editTask}
            />
          </>
          
        }
    </div>
  )
}

export default AddChecklist