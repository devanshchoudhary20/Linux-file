'use client'; 

import React, { useContext, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { ItemContext } from '@/app/Context/ItemContext';


const Calendar = ({isClicked,setIsClicked,getDate}) => {

  const {task,setTask} = useContext(ItemContext);


  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const generateCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
      const isSelected = date.toDateString() === selectedDate.toDateString();

      days.push(
        <div
          key={day}
          className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer
            ${isPast ? 'opacity-50' : ''}
            ${isSelected ? 'bg-green-500 text-white' : ''}
            ${isToday && !isSelected ? 'border border-green-500' : ''}
          `}
          onClick={() => {
            setSelectedDate(date)
            const newDate = new Date(date).getTime();
            setTask({...task,
              startDate : newDate,
              createdAt : newDate,
              completionDate  : newDate

            })
            setIsClicked(!isClicked);
            getDate(date);
          }}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="w-full bg-white rounded-b-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <MdChevronLeft className="w-6 h-6 text-gray-600 cursor-pointer" onClick={prevMonth} />
        <h2 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <MdChevronRight className="w-6 h-6 text-gray-600 cursor-pointer" onClick={nextMonth} />
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-gray-500 text-sm">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;