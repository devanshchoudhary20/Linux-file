'use client'
import React, { useContext } from 'react'
import { FaChevronRight} from 'react-icons/fa';
import {ROOMS as rooms} from '@/app/State/InitialState.js'
import { ItemContext } from '@/app/Context/ItemContext';


const Room = ({showtasks,handleRoomSelection,isClicked,setIsClicked} : any) => {  

  const {task,setTask} = useContext(ItemContext);
  
  const handleclicked = (key: any) => {
    setTask({...task, room : key});
    handleRoomSelection(key);
    setIsClicked(!isClicked);
  };

  return (
    <div>
        <div className="space-y-3">
            {rooms.map((room) => (
              <div key={room.name} className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm"
              onClick={() => handleclicked(room.name)}
              >
                <div className="flex items-center">
                  <div className={`${room.color} p-2 rounded-xl mr-3 text-white`}>
                    {React.cloneElement(room.icon, { className: "w-6 h-6" })}
                  </div>
                  <span className="text-lg">{room.name}</span>
                </div>
                {showtasks && <span className="text-gray-400 text-sm flex items-center">
                    NO TASKS <FaChevronRight className="w-5 h-5 ml-1" />
                </span>}
              </div>
              
            ))}
          </div>
    </div>
  )
}

export default Room