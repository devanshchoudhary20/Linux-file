import React, { useState, useRef, useContext } from 'react';
import { ItemContext } from '@/app/Context/ItemContext';


const TimePicker = ({isEdit,editTask}) => {

  const initialValue = isEdit ? editTask.reminder : '00:00'

  const {task,setTask} = useContext(ItemContext);
  const [time, setTime] = useState(initialValue);
  const inputRef = useRef(null);

  const handleTimeChange = (e : any) => {
    setTime(e.target.value);
    setTask({...task,reminder : e.target.value})
  };

  const handleClick = () => {
    if(inputRef){
      inputRef?.current;
    }
  };

  return (
    <div 
      className="relative inline-block cursor-pointer p-2 hover: rounded"
      onClick={handleClick}
    >
      <div className="text-md font-semibold text-teal-500">
        {time}
      </div>
      <input
        ref={inputRef}
        type="time"
        value={time}
        onChange={handleTimeChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
        required
      />
      
    </div>
  );
};

export default TimePicker;