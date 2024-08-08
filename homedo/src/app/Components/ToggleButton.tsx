'use client';
import React ,{useState} from 'react'

const ToggleButton = ({isEnabled,setIsEnabled}:{isEnabled:boolean, setIsEnabled: Function}) => {
    

  return (
    <div>
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
  )
}

export default ToggleButton