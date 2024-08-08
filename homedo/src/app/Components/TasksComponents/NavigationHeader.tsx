'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoChevronBackOutline } from "react-icons/io5";

const NavigationHeader = () => {

  const router = useRouter();
  const handleClick = (path : any) => {
    router.push(path);
  } 
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-blue-50 border-b border-gray-200">
      <button className="flex items-center text-cyan-500" onClick={() => handleClick('/')}>
        <IoChevronBackOutline className="text-xl" />
        <span className="ml-1">Back</span>
      </button>
    </header>
  );
};

export default NavigationHeader;