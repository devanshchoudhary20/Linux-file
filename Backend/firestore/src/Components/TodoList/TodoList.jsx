import React from 'react'

const TodoList = ({todos,updateTodo,deleteTodo}) => {
  return (
    <div>
        <ul className="TodoList">
            {
                todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
                        />
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default TodoList