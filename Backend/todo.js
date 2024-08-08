// Assuming you're using this in a web browser environment

const API_URL = 'http://localhost:3000';

// Fetch all todos
async function fetchTodos() {
  try {
    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const todos = await response.json();
    displayTodos(todos);
  } catch (error) {
    console.error('Error:', error);
  } 
}
 
// Create a new todo
async function createTodo(title, description) {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    const newTodo = await response.json();
    console.log('New todo created:', newTodo);
    fetchTodos(); // Refresh the todo list
  } catch (error) {
    console.error('Error:', error);
  }
}

// Update a todo
async function updateTodo(id, updates) {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    const updatedTodo = await response.json();
    console.log('Todo updated:', updatedTodo);
    fetchTodos(); // Refresh the todo list
  } catch (error) {
    console.error('Error:', error);
  }
}

// Delete a todo
async function deleteTodo(id) {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
    console.log('Todo deleted');
    fetchTodos(); // Refresh the todo list
  } catch (error) {
    console.error('Error:', error);
  }
}

// Display todos in the DOM
function displayTodos(todos) {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.innerHTML = `
      <h3>${todo.title}</h3>
      <p>${todo.description}</p>
      <p>Completed: ${todo.completed ? 'Yes' : 'No'}</p>
      <button onclick="updateTodo('${todo._id}', {completed: ${!todo.completed}})">
        Toggle Complete
      </button>
      <button onclick="deleteTodo('${todo._id}')">Delete</button>
    `;
    todoList.appendChild(todoItem);
  });
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  fetchTodos();

  const todoForm = document.getElementById('todoForm');
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('todoTitle').value;
    const description = document.getElementById('todoDescription').value;
    createTodo(title, description);
    todoForm.reset();
  });
});