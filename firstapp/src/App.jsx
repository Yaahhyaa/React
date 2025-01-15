import { useState } from 'react';
import './App.css';

function App() {

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Funktion zum Hinzufügen eines neuen To-Do
  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo(''); // Eingabefeld zurücksetzen
  };


  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Funktion zum Entfernen eines To-Do
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>To-Do Liste</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Neues To-Do..."
          style={{ padding: '8px', width: '70%', marginRight: '10px' }}
        />
        <button onClick={addTodo} style={{ padding: '8px' }}>
          Hinzufügen
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '10px',
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            <span onClick={() => toggleTodo(index)} style={{ cursor: 'pointer', flexGrow: 1 }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(index)} style={{ marginLeft: '10px', padding: '5px 10px' }}>
              Löschen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
