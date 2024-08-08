'use client'
import React, { useState, useEffect, useContext } from 'react';
import { ItemContext } from '@/app/Context/ItemContext';

const CustomRepeat = ({isCustomClicked,setIsCustomClicked, customValue}) => {
  const [frequency, setFrequency] = useState(1);
  const [interval, setInterval] = useState('Day');
  const [day, setDay] = useState('Mo')
  const [selectedDay, setSelectedDay] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const {task,setTask} = useContext(ItemContext);

  const frequencyOptions = Array.from({ length: 30 }, (_, i) => i + 1);
  const intervalOptions = ['Day', 'Week', 'Month'];
  const dayOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const value = (frequency === 1 ) 
  ? `After Every ${interval.toLowerCase()} ${(interval === 'Week')?`on ${selectedDay.map(days =>  dayOfWeek[days])}` : ''}`
  :(interval === 'Week')
    ?`After Every ${frequency} ${interval.toLowerCase()} on ${selectedDay.map(days =>  dayOfWeek[days])}`
    :`After Every ${frequency} ${interval.toLowerCase()}`

  useEffect(() => {
    if (interval !== 'Week') {
      setSelectedDay([]);
    }
  }, [interval]);

  const handleDayClick = (day) => {
    if (frequency === 1 && interval === 'Week') {
      if (selectedDay.includes(day)) {
        setSelectedDay(selectedDay.filter(d => d !== day));
      } else {
        setSelectedDay([...selectedDay, day]);
      }
    } else {
      setSelectedDay([day]);
    }
  };

  return (
    <div className={isComplete? `display : none ` : `bg-blue-50 p-4 shadow-lg mx-auto h-full w-full fixed top-0 left-0 z-10`}>
      <div>
        <header className="flex items-center justify-between px-4 py-3 bg-blue-50 border-b border-gray-200 rounded-t-xl">
            <button className="flex items-center text-cyan-500">
                <span className="ml-1">Cancel</span>
            </button>
            <button className="text-cyan-500"
            onClick={() => {
              setIsCustomClicked(!isCustomClicked)
              customValue(value.toString())
              setIsComplete(true)
              setTask ({...task,
                repeat : {
                  frequency: {frequency},
                  dayOfWeek: {selectedDay},
                  intervals: {interval}
                }
              })
            }}
            >
              Save
            </button>
        </header>
      </div>

      <div className="mb-6 bg-white rounded-xl mt-8">
        <div className='flex justify-between py-4 px-2'>
        <p className="text-gray-600 mb-2">Frequency</p>
        <div className="text-teal-500 mb-2 overflow-x-hidden w-1/2 whitespace-nowrap text-ellipsis">
          {
            value
          }
        </div>
        </div>
        
        <div className="flex justify-between items-center p-4">
          <select
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-1/2 p-2 text-lg bg-gray-100 rounded-lg mr-2"
          >
            {frequencyOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="w-1/2 p-2 text-lg bg-gray-100 rounded-lg ml-2"
          >
            {intervalOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {interval === 'Week' && (
        <div className='bg-white p-4 rounded-xl'>
          <p className="text-gray-600 mb-2">Set Specific Day</p>
          <div className="flex justify-between">
            {dayOfWeek.map((day,index) => (
              <button
                key={day}
                value = {day}
                onClick={() => handleDayClick(index)}
                className={`w-12 h-12 rounded-full ${
                  selectedDay.includes(index)
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                } flex items-center justify-center`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomRepeat;