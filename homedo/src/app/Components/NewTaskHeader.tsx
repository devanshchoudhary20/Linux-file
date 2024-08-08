'use client';
import React ,{useContext, useState} from 'react'
import { ItemContext } from '../Context/ItemContext';
import { useSettings } from '../Context/GlobalContext';
import { getChangedValues, updateTaskInLocalStorage } from '../Utils/Utils';
import { emptyTask } from '../State/InitialState';
import { useUser } from '@/fireabase/Context/UserContext';
import { addTask, updateTask } from '@/fireabase/tasksActions';


const NewTaskHeader = ({...props} : any) => {
    const [isComplete, setIsComplete] = useState(false);
    const {task,setTask} = useContext(ItemContext);
    const {state,setState} = useSettings();
    const {user, placeid, setPlaceid} = useUser();

    const handleSaveClick = async() =>{
      // console.log(task);
      if (props.isEdit) {
        // Editing an existing task
        await updateTask(props.editTask.id, task);
        console.log('Successfully updated task in Firestore');
      } else {
        // Creating a new task
        const newTaskId = await addTask(user.uid, placeid, task);
        
        console.log('Successfully added new task to Firestore with ID:', newTaskId);
      }
        // debugger
       
    }
    
  return (
    <div>
    <header className="flex items-center justify-between px-4 py-3 bg-blue-50 border-b border-gray-200 rounded-t-xl">
        <button className="flex items-center text-cyan-500">
            <span className="ml-1" onClick ={() => (props.setIsEdit(false))}>{props.left}</span>
        </button>
        <h1 className='font-bold text-teal-900'>{props.center}</h1>
        <button className={`${isComplete ? "text-cyan-500": "text-gray-300"}`}
        // disabled= {!isComplete}
        onClick={handleSaveClick}
        >
            {props.right}
        </button>
    </header>
    </div>
  )
}

export default NewTaskHeader;