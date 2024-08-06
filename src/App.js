import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import './App.css'; // Assuming you have some global styles here

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSave = (task) => {
    if (editingTask) {
      const updatedTasks = tasks.map((t) =>
        t === editingTask ? { ...task } : t
      );
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, task]);
    }
    setEditingTask(null);
    setShowForm(false);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = (task) => {
    setTasks(tasks.filter((t) => t !== task));
  };

  const handleCancel = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task, index) => (
        <div key={index} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <div className="task-buttons">
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task)}>Delete</button>
          </div>
        </div>
      ));
  };

  return (
    <div className="App">
      <Sidebar />
      <Header />
      <button className="open-form-button" onClick={() => setShowForm(true)}>
        {editingTask ? 'Edit Task' : 'Create New Task'}
      </button>
      {showForm && (
        <div className="task-form-overlay">
          <TaskForm
            task={editingTask}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}
      <div className="task-columns">
        <div style={{ width: '32%', background: '#eb5934', borderRadius: '8px' }}>
          <h2 className='headingNameh'>To Do</h2>
          {renderTasks('To Do')}
        </div>
        <div style={{ width: '32%', background: '#ebe834', borderRadius: '8px' }}>
          <h2 className='headingNameh'>In Progress</h2>
          {renderTasks('In Progress')}
        </div>
        <div style={{ width: '32%', background: '#34eb67', borderRadius: '8px' }}>
          <h2 className='headingNameh'>Done</h2>
          {renderTasks('Done')}
        </div>
      </div>
    </div>
  );
}

export default App;
