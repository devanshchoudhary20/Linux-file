import React, { useState, useEffect } from 'react';
import {FaChevronDown } from 'react-icons/fa';
import { AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import { IoChevronBackOutline } from "react-icons/io5";
import { STATUS_MESSAGES, ROOMS as rooms } from '@/app/State/InitialState.js';
import BottomNav from '../BottomNav';
import AllTasks from './AllTasks';
import CompletedTask from './CompletedTask';
import TaskList from '../AllTask/Tasks';
import AllTask from '../AllTask/AllTask';
import { useUser } from '@/fireabase/Context/UserContext';
import { getAllTasks } from '@/fireabase/tasksActions';


const MyHome = () => {

  const [isRoomClicked,setIsRoomClicked] = useState(false)
  const [roomSelected,setRoomSelected] = useState('');
  const {user,placeid,loading } = useUser();

  const [roomStatuses, setRoomStatuses] = useState({});
  console.log(roomStatuses);

  
  useEffect(() => {
    const fetchRoomStatuses = async () => {
      const statuses : any = {};
      for (const room of rooms) {
        statuses[room.name] = await totalTask(room.name);
      }
      setRoomStatuses(statuses);
    };
    fetchRoomStatuses();
  }, []);

  // debugger
  const handleclicked =(name : string) => {
    setIsRoomClicked(!isRoomClicked);
    setRoomSelected(name);
  };

  const filteredTask = (async (room: string) => {
    if(!loading){
      console.log(user?.uid);
      const tasks = await getAllTasks(user.uid,placeid)
    const filteredTask = tasks.filter((task : any) => task.isCompleted === false && task.room === room);
    return filteredTask
    }
  })

  debugger
  const totalTask = async (room: string) => {
    if(!loading){ 
    const items = await filteredTask(room);
    console.log(items);
    if (items.length === 0) {
      return {
        color: STATUS_MESSAGES[2].color,
        icon: STATUS_MESSAGES[2].icon,
        name: STATUS_MESSAGES[2].name,
        items: []
      };
    } else {
      let status = {
        color: STATUS_MESSAGES[1].color,
        icon: STATUS_MESSAGES[1].icon,
        name: STATUS_MESSAGES[1].name,
        items: items
      };
      
      items.some((task: any) => {
        const completionDate = new Date(task.completionDate).getDate();
        const currentDate = new Date().getDate();
        if (completionDate === currentDate || completionDate < currentDate) {
          status = {
            color: STATUS_MESSAGES[0].color,
            icon: STATUS_MESSAGES[0].icon,
            name: items.length + STATUS_MESSAGES[0].name,
            items: items
          };
          return true; // Stop iteration
        }
      });
      
      return status;
    }
  }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <div>No user logged in</div>;
  }


  // debugger
  return (
    <div className="max-w-md mx-auto bg-gray-100 h-screen flex flex-col pt-8">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 ">
        <h1 className="text-3xl font-bold mb-4 flex items-center">
          New Home <FaChevronDown className="ml-2 w-6 h-6 text-gray-400" />
        </h1>

        <div className="space-y-3 ">
          <AllTasks />
          <CompletedTask />

          <div className="flex justify-between items-center mt-6 mb-2 pt-4 pb-2">
            <span className="font-semibold text-xl">Rooms</span>
            <div className="flex space-x-4">
              <AiOutlineEdit className="w-6 h-6 text-teal-500" />
              <AiOutlinePlus className="w-6 h-6 text-teal-500" />
            </div>
        </div>
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
                <span className={`text-sm flex items-center ${roomStatuses[room.name]?.color || ''}`}>
                    {roomStatuses[room.name]?.name || ''}
                    <div className='ml-2'>
                      {roomStatuses[room.name]?.icon}
                    </div>
                </span>                               
              </div>              
            ))}
          </div>
        </div>
      </div>

      {isRoomClicked && roomStatuses[roomSelected]?.items.length > 0 &&
      <div className='w-full h-full fixed top-0 bg-blue-50'>
      <header className="flex items-center justify-between px-4 py-3 bg-blue-50 border-b border-gray-200">
        <button className="flex items-center text-cyan-500" onClick={() => setIsRoomClicked(!isRoomClicked)}>
          <IoChevronBackOutline className="text-xl" />
          <span className="ml-1">Back</span>
        </button>
        <button className="text-cyan-500">
          Select
        </button>
      </header>
      <TaskList 
      roomSelected = {roomSelected}
      isRoomClicked = {isRoomClicked}
      />
      </div>
    }
    {
      isRoomClicked && roomStatuses[roomSelected]?.items.length === 0 &&
      <div className='w-full h-full fixed top-0'>
        <AllTask />
      </div>
    }
      <BottomNav />
    </div>
  );
};

export default MyHome;