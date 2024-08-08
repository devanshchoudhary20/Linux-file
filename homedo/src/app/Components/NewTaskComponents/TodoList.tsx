'use client'
import React, { useContext, useState, useEffect } from 'react';
import { ItemContext } from '@/app/Context/ItemContext';

const TodoList = ({isEdit, editTask}) => {
  const { task, setTask } = useContext(ItemContext);

  const initialValue = isEdit ? editTask.checklist : [];

  const [todos, setTodos] = useState(initialValue);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    setTask({ ...task, checklist: todos });
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleKeyDown = (e, id = null) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (id) {
        updateTodo(id);
      } else {
        addTodo();
      }
    }
  };

  const handleCheckboxChange = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const updateTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: todo.text } : todo
    ));
    setEditingTodo(null);
  };

  const handleTodoTextChange = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  return (
    <div className="bg-blue-50 h-full p-6 rounded-lg shadow-md max-w-md mx-auto">
      <ul className="space-y-3 bg-white p-4 rounded-xl">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center space-x-3 pb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              className="form-checkbox h-5 w-5 text-teal-500 rounded border-gray-300 focus:ring-teal-500"
              onChange={() => handleCheckboxChange(todo.id)}
            />
            <input
              type="text"
              value={todo.text}
              onChange={(e) => handleTodoTextChange(todo.id, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, todo.id)}
              onBlur={() => updateTodo(todo.id)}
              className={`w-full text-lg text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 ${todo.completed ? 'line-through' : ''}`}
            />
          </li>
        ))}
        <li className="flex items-center space-x-3">
          <input
            type="checkbox"
            disabled
            className="form-checkbox h-5 w-5 text-teal-500 rounded border-gray-300 focus:ring-teal-500"
          />
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="New checklist"
            className="text-lg text-gray-500 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400 w-full"
          />
        </li>
      </ul>
    </div>
  );
};

export default TodoList;