'use client'
import React, { useState } from 'react'
import { IoRepeatOutline} from 'react-icons/io5';
import DropdownMenu from './RepeatDropdown';

const Repeat = ({isEdit,editTask}) => {
  const[isClicked,setIsClicked] = useState(false);
  let Option = '';
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const OptionSelected = (selected_option : any) => {
    console.log('parent option -->',selected_option)
    Option = selected_option;
  }
  return (
    <div>
        <div className="flex items-center justify-between py-3 px-1 bg-white h-14 rounded-xl">
            <div className="flex items-center">
              <IoRepeatOutline className="w-5 h-5 text-gray-400 mr-3" />
              <span className="text-gray-800">Repeat</span>
            </div>
            <DropdownMenu 
            OptionSelected={OptionSelected}
            isEdit ={isEdit}
            editTask = {editTask}
            />
        </div>
        
    </div>
  )
}

export default Repeat;