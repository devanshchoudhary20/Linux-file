
import { useSettings } from '@/app/Context/GlobalContext';
import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdKeyboardArrowDown, MdCheck, MdRepeat, MdAccessAlarm } from 'react-icons/md';
import UndoCompletedTask from './UndoCompletedTask';
import { useRouter } from 'next/navigation';

const TaskList = () => {
  const [timeFilter, setTimeFilter] = useState('Last 7 days');
  const [isClient, setIsClient] = useState(false);
  const [isClicked,setIsClicked] = useState(false);
  const [id,setId] = useState(0);
  const router = useRouter()


  useEffect(() => {
    setIsClient(true);
  }, []);

  const {state,setState} = useSettings();

  const tasks = state.places[0].tasks;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const handleItemClicked =(id : number) => {
    setIsClicked(!isClicked)
    setId(id);
    console.log(id);
  }
  return (
    <div className="max-w-md mx-auto bg-blue-50 p-4 font-sans h-full">
      <div className="flex items-center mb-4">
        <div className='flex items-center'
        onClick={() => {router.push('/home')}}
        >
            {isClient && <MdChevronLeft className="text-teal-500 w-8 h-8" />}
            <div className='text-teal-500 text-md'>Back</div>
        </div>      
        <h1 className="text-lg font-semibold text-Gray-500 ml-16">Completed Tasks</h1>
      </div>

      <div className="flex space-x-2 mb-4">
        <div className="relative">
          <select
            className="appearance-none bg-teal-50 text-teal-500 py-2 px-4 pr-8 rounded-full"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option>Last 7 days</option>
            <option>Last 14 days</option>
            <option>Last 30 days</option>
          </select>
          {isClient && <MdKeyboardArrowDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-teal-500 w-4 h-4" />}
        </div>
      </div>

      <div>
        {tasks
        .filter(task => task.isCompleted === true)
        .map((task, index) => (
          <div key={task.id} className="bg-white rounded-lg p-4 mb-4 shadow-sm"
          onClick={() => handleItemClicked(task.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{task.title}</h2>
                {task.subtitle && <p className="text-sm text-gray-500">{task.subtitle}</p>}
                <p className="text-purple-400">{task.room}</p>
              </div>
              <span className="text-gray-400 text-sm">
                {formatDate(task.completionDate)} {formatTime(task.completionDate)}
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              {task.isCompleted ? 'Completed' : 'Created'} by {task.owner}
            </p>
          </div>
        ))}
      </div>
      {
        isClicked && 
        <UndoCompletedTask 
        id ={id} 
        task = {tasks}
        isClicked = {isClicked}
        setIsClicked = {setIsClicked}
        />
      }
    </div>
  );
};

export default TaskList;