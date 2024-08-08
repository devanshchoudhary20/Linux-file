'use client'
import React, { useState } from 'react';
import AddTaskTitle from './AddTaskTitle';
import SelectRoom from './SelectRoom';
import DatePicker from './DatePicker';
import Repeat from './Repeat';
import Reminder from './Reminder';
import AddChecklist from './AddChecklist';
import NewTaskHeader from '../NewTaskHeader';


const TaskCreation = ({setIsEdit, isEdit,task}) => {
  
  const center = isEdit ? "Edit Task" : "New Task"
  return (
    <div className=" bg-blue-50 overflow-hidden shadow-lg font-sans h-full fixed w-full top-0 left-0">
      <NewTaskHeader 
            left ="Cancel" 
            right ="Save" 
            center = {center}
            isEdit = {isEdit}
            setIsEdit = {setIsEdit}
            editTask = {task}
            />
            <hr/>
      <div className="px-4 py-4 space-y-4"> 
        <AddTaskTitle isEdit = {isEdit} editTask ={task}/>
        <div className="space-y-2">
            <SelectRoom isEdit = {isEdit} editTask ={task}/>
            <DatePicker isEdit = {isEdit} editTask ={task}/>
            <Repeat  isEdit = {isEdit} editTask ={task}/>
            <Reminder isEdit = {isEdit} editTask ={task}/>
            <AddChecklist isEdit = {isEdit} editTask ={task}/>
          
        </div>
      </div>
    </div>
  );
};

export default TaskCreation;
