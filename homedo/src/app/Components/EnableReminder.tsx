'use client';
import React, { useState } from 'react';
import { IoChevronDown } from "react-icons/io5";

const DailyReminderSettings = ({text} : any) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [notificationTime, setNotificationTime] = useState('08:00 AM');
  const [isSetTimeClicked, setIsSetTimeClicked] = useState(false)

  const handleSetTime = () => {
    setIsSetTimeClicked(!isSetTimeClicked);
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mx-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700 font-medium">{text}</span>
        <button
          className={`w-14 h-8 flex items-center rounded-full p-1 ${
            isEnabled ? 'bg-green-400' : 'bg-gray-300'
          }`}
          onClick={() => setIsEnabled(!isEnabled)}
        >
          <span
            className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
              isEnabled ? 'translate-x-6' : ''
            }`}
          ></span>
        </button>
      </div>
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

export default DailyReminderSettings;