'use client'
import React, { useState, useEffect } from 'react';
import { IoHome, IoAdd, IoEnter, IoAirplane, IoMoon, IoCalendarClear, IoNotifications, IoMail, IoDocument, IoChevronForward, IoHomeOutline, IoCalendarOutline, IoSettingsOutline } from 'react-icons/io5';
import { FaFire } from 'react-icons/fa';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPremium, setIsPremium] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const MenuItem = ({ Icon, text, rightText, toggle, onClick, iconColor }) => (
    <div className="flex items-center py-3.5 px-4 border-b border-gray-100 dark:border-gray-700" onClick={onClick}>
      <Icon className={`text-2xl ${iconColor}`} />
      <span className="ml-3.5 flex-grow text-[15px] text-gray-900 dark:text-white">{text}</span>
      {rightText && <span className="text-[15px] text-gray-400 dark:text-gray-500">{rightText}</span>}
      {toggle !== undefined && (
        <div className={`w-11 h-6 flex items-center ${toggle ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-600'} rounded-full p-1 duration-300 ease-in-out`}>
          <div className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${toggle ? 'translate-x-5' : ''}`}></div>
        </div>
      )}
      {!toggle && !rightText && <IoChevronForward className="text-gray-300 dark:text-gray-500 text-xl" />}
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        </div>
        
        <div className="flex items-center p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-300 font-semibold text-xl">
            DC
          </div>
          <div className="ml-3 flex-grow">
            <div className="font-semibold text-[15px] text-gray-900 dark:text-white">Devansh Choudhary</div>
            <div className="text-[13px] text-gray-400 dark:text-gray-500">rxmpcsjy7x@privaterelay.appleid.com</div>
            {isPremium && <div className="text-[13px] text-orange-500 flex items-center mt-0.5"><FaFire className="mr-1" /> Premium Account</div>}
          </div>
          <IoChevronForward className="text-gray-300 dark:text-gray-500 text-xl" />
        </div>

        <div className="py-1">
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500">1 HOME</div>
          <MenuItem Icon={IoHome} text="New home" rightText="2 members" iconColor="text-blue-500" />
          <MenuItem Icon={IoAdd} text="Add New Home" iconColor="text-green-500" />
          <MenuItem Icon={IoEnter} text="Join Home" iconColor="text-green-500" />
        </div>

        <MenuItem Icon={IoAirplane} text="Vacation Mode" iconColor="text-blue-500" />
        <MenuItem Icon={IoMoon} text="Dark Mode" toggle={isDarkMode} onClick={toggleDarkMode} iconColor="text-blue-500" />
        <MenuItem Icon={IoCalendarClear} text="Start Week On" rightText="Sunday" iconColor="text-purple-500" />
        <MenuItem Icon={IoNotifications} text="Notifications" iconColor="text-red-500" />
        <MenuItem Icon={IoMail} text="Contact Us" iconColor="text-green-500" />
        <MenuItem Icon={IoDocument} text="Terms of Use" iconColor="text-blue-500" />

        <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 py-2">
          <button className="flex flex-col items-center text-gray-400 dark:text-gray-500">
            <IoHomeOutline className="text-2xl" />
            <span className="text-[10px] mt-0.5">My Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 dark:text-gray-500">
            <IoCalendarOutline className="text-2xl" />
            <span className="text-[10px] mt-0.5">Schedule</span>
          </button>
          <button className="flex flex-col items-center text-green-500">
            <IoSettingsOutline className="text-2xl" />
            <span className="text-[10px] mt-0.5">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;