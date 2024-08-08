'use client'
import React, { useState } from 'react'
import { MdOutlineNavigateNext } from "react-icons/md";
import { BsListTask } from "react-icons/bs";
import Rooms from './Rooms';
import Room from './Room';
import {ROOMS} from '@/app/State/InitialState.js'


const SelectRoom = ({isEdit,editTask}) => {
  const initialValue = isEdit ? editTask.room : ''

  const [isClicked,setIsClicked] = useState(false);
  const [choosenRoom,setChoosenRoom] = useState(initialValue);
  const handleClick = () => {
     setIsClicked(!isClicked);
  };

  const handleRoomSelection = (room : any) => {
    setChoosenRoom(room);
    // console.log('selected room -->',room);
  }

  const SelectedRoom = ROOMS.filter(room => room.name === choosenRoom);
  // console.log('selectedRoom-->',SelectedRoom)

  return (
    <div>
      {
        choosenRoom && 
        <div className="space-y-3">
            {
            ROOMS
            .filter(room => room.name === choosenRoom)
            .map((room) => (
              <div key={room.name} className="flex items-center justify-between bg-white p-2 rounded-xl shadow-sm"
              >
                <div className="flex items-center">
                  <div className={`${room.color} p-2 rounded-xl mr-3 text-white`}>
                    {React.cloneElement(room.icon, { className: "w-6 h-6" })}
                  </div>
                  <span className="text-lg">{room.name}</span>
                </div>
                <MdOutlineNavigateNext className="w-8 h-8 text-gray-400" onClick={handleClick}/>
              </div>             
            ))            
            }
          </div>
        }
        {
          !choosenRoom &&
        <div className="flex items-center justify-between py-3 px-1 bg-white h-14 rounded-xl">
            <div className="flex items-center">
                <BsListTask className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-800">Select Room</span>
            </div>
            <MdOutlineNavigateNext className="w-8 h-8 text-gray-400" onClick={handleClick}/>
        </div>
      
      }
      {
      isClicked && 
        (
          <div className='w-full h-full'>
            <Rooms 
            handleRoomSelection ={handleRoomSelection} 
            isClicked = {isClicked}
            setIsClicked = {setIsClicked}
            />
          </div>
        )
        }
    </div>


  )
}

export default SelectRoom