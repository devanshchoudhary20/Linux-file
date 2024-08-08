'use client'
import React, {useState} from 'react'
import { IoCalendarOutline} from 'react-icons/io5';
import Calendar from './Calendar';
import { DateFilter } from '@/app/Utils/Utils';

const DatePicker = ({isEdit,editTask}) => {
  
  const initialvalue = isEdit ? 
  (
  DateFilter(editTask.completionDate).date === new Date().getDate 
  && DateFilter(editTask.completionDate).month === new Date().getMonth
  ? 'Today' : 
  `${DateFilter(editTask.completionDate).day}, ${DateFilter(editTask.completionDate).date} ${DateFilter(editTask.completionDate).monthName}`
)
 : 'Today'
  const [isClicked, setIsClicked] = useState(false);
  const [displayedDate,setdisplayedDate] = useState(initialvalue)
  const handleDateClicked = () => {
    setIsClicked(!isClicked);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = [
    "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
  ];
  const getDate = (date) => {
    if(date){
      const pickedDate = new Date(date.toString()).getDate();
      const pickedMonth = new Date(date.toString()).getMonth();
      const pickedDay = new Date(date.toString()).getDay();
      const currentDate = new Date()
      if(pickedDate === currentDate.getDate() && pickedMonth === currentDate.getMonth())
      {
          setdisplayedDate('Today')
      }else{
        setdisplayedDate(`${days[pickedDay]}, ${pickedDate} ${monthNames[pickedMonth]}`)
      }
    }
    
    
  }

  const round = isClicked === true ? "rounded-t-lg" : "rounded-lg"

  return (
    <div>
        <div className={`flex items-center justify-between py-3 px-1 bg-white h-14 ${round}`}>
            <div className="flex items-center">
              <IoCalendarOutline className="w-5 h-5 text-blue-500 mr-3" />
              <span className="text-blue-500">Date</span>
            </div>
            <span className="text-teal-500 mr-2" onClick={handleDateClicked}>{displayedDate}</span>
            
          </div>
          <div className='w-full'>
          {isClicked &&
          <>
          <hr />
          <Calendar 
          isClicked = {isClicked} 
          setIsClicked = {setIsClicked} 
          getDate={getDate}
          />
          </>
            }
          </div>
          
    </div>
  )
}

export default DatePicker