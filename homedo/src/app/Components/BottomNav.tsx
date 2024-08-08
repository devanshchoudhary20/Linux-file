import React from 'react'
import { FaHome, FaRegCalendarCheck, FaCog} from 'react-icons/fa';

const BottomNav = () => {
  return (
    <div className="bg-white flex justify-around items-center py-2 border-t border-gray-200 ">
        <div className="flex flex-col items-center text-teal-500">
          <FaHome className="w-6 h-6" />
          <span className="text-xs mt-1">My Home</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <FaRegCalendarCheck className="w-6 h-6" />
          <span className="text-xs mt-1">Schedule</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <FaCog className="w-6 h-6" />
          <span className="text-xs mt-1">Settings</span>
        </div>
      </div>
  )
}

export default BottomNav