import React from 'react'
import './ListItems.css'
const ListItems = ({todos, onCheckboxChange,onTitleChange, onTextChange}) => {
  const todoItems = todos;
  // console.log(todoItems);
  return (
    <div className="items">
      {
        todoItems.map((todo) => { 
          return (
          <div className="todo">
            <div>
              <div>
                <input type = 'text' class="title" value={todo.title} 
                onChange={(e) => onTitleChange(todo.id,e)}/>
              </div>
              <div>
                <input type = 'text' class="text" value={todo.text} onChange={(e) => onTextChange(todo.id,e,e.target.value)}/>
              </div>
            </div>
            <input type="checkbox" 
            checked = {todo.checked}
            onChange={() => onCheckboxChange(todo.id)}  />
          </div>
        )
        })
      }
    </div>
  )
}

export default ListItems