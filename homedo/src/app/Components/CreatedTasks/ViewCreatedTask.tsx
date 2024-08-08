import React, { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { taskDueDateLogic } from '../AllTask/TaskDueDateLogic';
import { getRepeatValue, markTaskAsDone, removeTaskFromLocalStorage, updateTaskInLocalStorage } from '@/app/Utils/Utils';
import TaskCreation from '../NewTaskComponents/TaskCreation';
import { useSettings } from '@/app/Context/GlobalContext';

const TaskDetails = ({ id, index, place, setIsClicked, isClicked }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [taskState, setTaskState] = useState(place.filter(task => task.id === id)[0]);
  const {state,setState} = useSettings()
  const { interval, icon, textColor } = taskDueDateLogic(taskState);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const deleteTask = () => {
    const removalSucc = removeTaskFromLocalStorage(id);
    if (removalSucc.isUpdated) {
      console.log('Task removed successfully');
      setIsClicked(!isClicked);
      setState(removalSucc.newState)
    } else {
      console.log('Failed to remove task');
    }
    // window.location.reload();
  };

  const handleTaskCompletion = () => {
    const completion = markTaskAsDone(id);
    if (completion) {
      console.log('Task marked as done successfully');
      setTaskState(prevState => ({ ...prevState, isCompleted: true }));
    } else {
      console.log('Failed to mark task as done');
    }
    window.location.reload();
  };

  const handleCheckboxChange = (index) => {
    const updatedChecklist = taskState.checklist.map((item, i) => 
      i === index ? { ...item, completed: !item.completed } : item
    );
    
    const updatedTask = { ...taskState, checklist: updatedChecklist };
    setTaskState(updatedTask);
    const update = updateTaskInLocalStorage(id, { checklist: updatedChecklist });
    if (update.isUpdated) {
      console.log('Task updated successfully');
      setState(update.newState)

    } else {
      console.log('Failed to update task');
    }
    // window.location.reload()
  };

  const handleSelectAll = () => {
    const allCompleted = taskState.checklist.every(item => item.completed);
    const updatedChecklist = taskState.checklist.map(item => ({ ...item, completed: !allCompleted }));
    
    const updatedTask = { ...taskState, checklist: updatedChecklist };
    setTaskState(updatedTask);
    const update = updateTaskInLocalStorage(id, { checklist: updatedChecklist });
    if (update.isUpdated) {
      console.log('Task updated successfully');
      setState(update.newState)
    } else {
      console.log('Failed to update task');
    }
  };

  const handleBackClick = () => {
    setIsClicked(!isClicked);
    // window.location.reload();
  }

  return (
    <div className="bg-blue-50 h-full w-full p-4 flex flex-col fixed top-0 left-0 z-20">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <MdChevronLeft className="w-6 h-6 text-teal-500" />
          <span className="text-teal-500 text-lg ml-2" onClick={handleBackClick}>Back</span>
        </div>
        <h1 className="text-xl font-semibold">Task Details</h1>
        <span className="text-teal-500 text-lg" onClick={() => setIsEdit(true)}>Edit</span>
      </div>

      <div className="text-xl font-semibold mb-6">{taskState.title}</div>

      {taskState.checklist[0] && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4 px-4">
            <span className="text-gray-400 font-semibold">CHECKLIST</span>
            <span className="text-teal-500 cursor-pointer" onClick={handleSelectAll}>
              {taskState.checklist.every(item => item.completed) ? 'Unselect All' : 'Select All'}
            </span>
          </div>
          <div className='bg-white p-4 rounded-xl'>
            {taskState.checklist.map((item, index) => (
              <div key={index}>
                <div className="flex items-center py-2">
                  <input 
                    type="checkbox" 
                    checked={item.completed}
                    onChange={() => handleCheckboxChange(index)}
                    className="w-5 h-5 rounded-sm border-2 border-teal-500 text-teal-500" 
                  />
                  <span className="ml-3 text-lg text-gray-700">{item.text}</span>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4 ">
        <h2 className="text-gray-400 font-semibold text-md px-4">DETAILS</h2>
        <div className='bg-white rounded-xl p-4'>
          <div className='pb-2 items-center'>
            <p className="text-gray-400 text-sm">DATE</p>
            <p className={textColor}>{interval}</p>
            <hr />
          </div>
          <div className='pb-2 items-center'>
            <p className="text-gray-400 text-sm">REPEAT</p>
            <p className="text-gray-700">{getRepeatValue(taskState.repeat)}</p>
            <hr />
          </div>
          <div className='pb-2 items-center'>
            <p className="text-gray-400 text-sm">REMINDER(24hrs)</p>
            <p className="text-gray-700">{taskState.reminder}</p>
            <hr />
          </div>
          <div className='pb-2 items-center'>
            <p className="text-gray-400 text-sm">ROOM</p>
            <p className="text-gray-700">{taskState.room}</p>
            <hr/>
          </div>
          <div className="flex justify-between items-center pb-2 ">
            <div>
              <p className="text-gray-400 text-sm">ASSIGNED TO</p>
              <p className="text-gray-700">{taskState.owner}</p>
            </div>
            <div className='flex justify-between items-center'>
              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-semibold">{getInitials(taskState.owner)}</span>
              </div>
              <MdChevronRight className="w-5 h-5 text-gray-400" />
            </div>                   
          </div>
          <div className='items-center pb-2'>
            <p className="text-gray-400 text-sm">CLEANING HISTORY</p>
            <p className="text-gray-700">{taskState.isCompleted ? 'Cleaned' : 'Not cleaned yet'}</p>
            <hr/>  
          </div>
        </div>

        <div className="mt-auto flex space-x-4 pt-16 pl-4 ">
          <button 
            className="flex-1 bg-teal-500 text-white py-3 rounded-md text-lg font-semibold"
            onClick={handleTaskCompletion}
          >
            Mark As Done
          </button>
          <button 
            className="flex-1 text-red-500 py-3 rounded-md text-lg font-semibold"
            onClick={deleteTask}
          >
            Delete
          </button>
        </div>
      </div>
      {isEdit && <TaskCreation setIsEdit={setIsEdit} isEdit={isEdit} task={taskState} />}
    </div>
  );
};

export default TaskDetails;