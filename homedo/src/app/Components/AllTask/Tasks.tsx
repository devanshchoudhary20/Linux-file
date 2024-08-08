import { useSettings } from '@/app/Context/GlobalContext';
import React, { useState } from 'react';
import { MdAccessTime, MdOutlineCheckBox, MdNotifications, MdPerson } from 'react-icons/md';
import { taskDueDateLogic } from './TaskDueDateLogic';
import TaskDetails from '../CreatedTasks/ViewCreatedTask';
const TaskItem = (props: any) => {
  const task = props.task;
  // Due Date Logic
  const { interval, icon, textColor } = taskDueDateLogic(task);

  // Checklist Logic
  let count = 0;
  let totalTask = 0;
  if (task.checklist) {
    task.checklist.forEach((item: any) => {
      if (item.completed) count++;
      totalTask++;
    });
  }

  
  
  return (
    <div className="bg-white rounded-lg p-2 mb-2 shadow "
    onClick={() => props.onTaskClick(props.index,props.task.id)}
    >
      <div className="text-l font-bold">{task.title}</div>
      {task.subtitle && <div className="text-gray-700 text-sm">{task.subtitle}</div>}
      <div className="flex items-center space-x-4 mt-1">
        {task.completionDate && (
          <div className={`flex items-center ${textColor}`}>
            {icon}
            <span className="text-sm">{interval}</span>
          </div>
        )}
        {task.checklist !== undefined && (
          <div className="flex items-center text-purple-600">
            <MdOutlineCheckBox className="w-4 h-4 mr-1" />
            <span className="text-sm">{count} of {totalTask}</span>
          </div>
        )}
        {task.reminder && task.reminder !== 0 && (
          <div className="flex items-center text-orange-400">
            <MdNotifications className="w-4 h-4 mr-1" />
            <span className="text-sm">{task.reminder}</span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-2 text-gray-500">
        <div className='text-sm'>{task.room}</div>
        <div className="flex items-center">
          <MdPerson className="w-4 h-4 mr-1" />
          <div className='mr-2 text-sm'>{task.owner}</div>
        </div>
      </div>
    </div>
  );
};

const TaskList = ({roomSelected,isRoomClicked}) => {
  const { state } = useSettings();
  const [isClicked,setIsClicked] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editId,setEditId] = useState(0);
  const place = state.places[0].tasks;

  const initialTaskState = isRoomClicked ? 
  place.filter(task=> task.room === roomSelected && task.isCompleted === false) 
  : place.filter(task => task.isCompleted === false)

  // debugger
  const handleTaskClick = (index,id) => {
    console.log(`index clicked`, index);
    console.log('id clicked :', id)
    setEditTaskIndex(index);
    setIsClicked(true);
    setEditId(id);
  };


  
  return (
    <div className="bg-blue-50 p-4">
      {initialTaskState
      .map((task, index) => (
        <TaskItem key={index} index={index} task={task} onTaskClick={handleTaskClick} />
      ))}
      {isClicked && editTaskIndex !== null && <TaskDetails id = {editId} index={editTaskIndex} place={place} setIsClicked ={setIsClicked} isClicked = {isClicked}/>}
    </div>
  );
};

export default TaskList;
