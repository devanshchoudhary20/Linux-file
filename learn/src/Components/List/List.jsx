import React, {useEffect, useState} from 'react'
import ListItems from '../ListItems/ListItems'
import todoData from '../../RawData/ListData'
import './List.css'
import Dropdown from '../Dropdown/Dropdown'
const List = () => {
  const Debounce = () => {

  }
  const newTodoData = JSON.parse(localStorage.getItem('newTodo'));
  const [newTodos,setNewTodos] = useState(() => {
    return newTodoData === null ? [...todoData] : [...newTodoData];
  });

  // useEffect(() => {
  //   const TimerId = setTimeout(() => {
  //     console.log("*")
  //     localStorage.setItem('newTodo',JSON.stringify(newTodos))

  //   },2000)
  //   return() =>{console.log("clear"); clearTimeout(TimerId)}
  // },[newTodos])

  const handleCheckboxChange = (id) => {
    setNewTodos((newTodos) => {
      const updatedTodo = newTodos.map((todo) =>{
        if(todo.id === id) {return { ...todo, checked: !todo.checked }}
        else {return todo}
      }
      )
      localStorage.setItem('newTodo',JSON.stringify(updatedTodo))
      return updatedTodo
    }
    
    )
    
  };

  const handleTitleChange = (id,e,newTitle) => {
    setNewTodos((newTodos) => {
      const updatedTodo = newTodos.map((todo) =>{
        if(todo.id === id) {
          return {
             ...todo, title: newTitle 
            }
        }
        else {return todo}
      }
      )
      localStorage.setItem('newTodo',JSON.stringify(updatedTodo))
      return updatedTodo
    }
    )
    
  };

  const handleTextChange = (id,e,newText) => {
    setNewTodos((newTodos) => {
      const updatedTodo =newTodos.map((todo) =>{
        if(todo.id === id) {return { ...todo, text: newText }}
        else {return todo}
      }
      )
      localStorage.setItem('newTodo',JSON.stringify(updatedTodo))
      return updatedTodo
    }
    )
    
  };

  const SortChecked = () => {
    const sortedTodos = [...newTodos].sort((a, b) => b.checked - a.checked);
    setNewTodos(sortedTodos);
    localStorage.setItem('newTodo',JSON.stringify(sortedTodos))
  };

  const SortUnchecked = () => {
    const unsortedTodos = [...newTodos].sort((a, b) => a.checked - b.checked);
    setNewTodos(unsortedTodos);
    localStorage.setItem('newTodo',JSON.stringify(unsortedTodos));

  };

  return (
    <div>
        {/* <Dropdown /> */}
        <button className="ascending" onClick={SortChecked}>
          Sort checked
        </button>
        <button className="descending" onClick={SortUnchecked}>
        Sort unchecked
        </button>
        <ListItems todos = {newTodos} onCheckboxChange = {handleCheckboxChange}  onTitleChange = {handleTitleChange} onTextChange = {handleTextChange}/>

    </div>
  )
}

export default List