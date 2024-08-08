import React, { useEffect } from 'react';
import {useState} from 'react';
import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import TodoList from '../TodoList/TodoList';


const firebaseConfig = {
  apiKey: "AIzaSyDITn0nbBmiR51ijxqDqOZTBcZ93rf8r-w",
  authDomain: "test-81c69.firebaseapp.com",
  projectId: "test-81c69",
  storageBucket: "test-81c69.appspot.com",
  messagingSenderId: "387958584591",
  appId: "1:387958584591:web:a6a6802b822ff4ee3fba7a",
  measurementId: "G-R406DY3HLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const Todo = () => {
    const [todos,setTodos] = useState([]);
    const [value,setValue] = useState('')

    useEffect(() => {
        fetchTodo()
    },[])

    const fetchTodo = async () =>{
        const todoCollection = collection(db,'todos');
        const snapShot = await getDocs(todoCollection);
        const TodoList = snapShot.docs.map(doc => ({...doc.data(),id : doc.id}))
        const sortedTodos = TodoList.sort((a,b) => a.ts?.seconds - b.ts?.seconds)
        setTodos(sortedTodos);
    }

    const addTodo = async(text) => {
        const todoCollection = collection(db,'todos')
        await addDoc(todoCollection,{text,completed : false, ts : serverTimestamp()});
        fetchTodo();
    }
    
    const updateTodo = async(id,updates) =>{
        const todoRef = doc(db,'todos',id)
        await updateDoc(todoRef,updates);
        fetchTodo();
    }

    const deleteTodo = async(id) => {
        const todoRef = doc(db,'todos',id);
        await deleteDoc(todoRef);
        fetchTodo()
    }

    const handleSubmit = () => {
        if(!value.trim()) return;
        addTodo(value);
        setValue('');
    }

    // const handleSort = () => {
    //     const sortedTodos = [...todos].sort((a, b) => {
    //       return a.ts?.seconds - b.ts?.seconds;
    //     });
    //     setTodos(sortedTodos);
    //   };


  return (
    <div>
        <div className="addTodo">
            <input type="text" value = {value} className='todoInput' onChange={(e) => setValue(e.target.value)}/>
            <button className="submitTodo" onClick={handleSubmit}>Add Task</button>           
        </div>
        {/* <button className="sort" onClick={handleSort}>
            Sort by Timestamp
        </button> */}
        <TodoList 
        todos = {todos}
        updateTodo = {updateTodo}
        deleteTodo = {deleteTodo}
        />
    </div>
  )
}

export default Todo