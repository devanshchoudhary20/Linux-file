'use client';
import React, { useState } from 'react';
import { IoChevronDown } from "react-icons/io5";

const ReminderTime = ({text} : any) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [notificationTime, setNotificationTime] = useState('08:00 AM');
  const [isSetTimeClicked, setIsSetTimeClicked] = useState(false)

  const handleSetTime = () => {
    setIsSetTimeClicked(!isSetTimeClicked);
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {isEnabled && <div className="flex justify-between items-center">
        <span className="text-gray-600">Send notification at</span>
        <button
          className="flex items-center bg-gray-100 rounded px-3 py-2 text-gray-700"
        >
          {notificationTime}
          <IoChevronDown className="ml-2" onClick={() => {handleSetTime}}/>
        </button>
      </div>
      }
      
    </div>
  );
};

export default ReminderTime;