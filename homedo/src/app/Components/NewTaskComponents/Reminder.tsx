'use client'
import React, { useState } from 'react'
import { IoRepeatOutline, IoNotificationsOutline, IoPersonOutline, IoCheckboxOutline, IoChevronDownOutline ,IoChevronUpOutline } from 'react-icons/io5';
import ToggleButton from '../ToggleButton';
import TimePicker from './SelectTime';

const Reminder = ({isEdit,editTask}) => {


  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const round = isEnabled ? "rounded-t-xl" : "rounded-b-xl"

  return (
    <div>
        <div className={`flex items-center justify-between py-3 px-1 bg-white ${round}`}>
          <div className="flex items-center">
              <IoNotificationsOutline className="w-5 h-5 text-gray-400 mr-3" />
              <div className='flex flex-col'>
              <span className="text-gray-800">Reminder</span>
              </div>  
          </div>
          <ToggleButton isEnabled = {isEnabled} setIsEnabled ={setIsEnabled}/>
        </div>
        {isEnabled && 
        <>
        <hr/>
        <div className='flex items-center justify-between py-3 px-1 bg-white rounded-b-xl text-gray-800'>
        <div>Select a Time</div>
        <TimePicker 
        isEdit = {isEdit}
        editTask = {editTask}
        />
        </div>
        </>
        }
        
    </div>
  )
}

export default Reminder