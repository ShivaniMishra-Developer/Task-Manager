import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://192.168.29.106:8000/api/tasks/');
        setTasks(response.data);
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      }
    };

    fetchTasks();
  }, []);

  const handleSave = (savedTask) => {
    setTasks((prevTasks) =>
      currentTask
        ? prevTasks.map((task) => (task.id === savedTask.id ? savedTask : task))
        : [...prevTasks, savedTask]
    );
    setShowForm(false);
    setCurrentTask(null);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setShowForm(true);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://192.168.29.106:8000/api/tasks/${taskId}/`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentTask(null);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <Header />
      <button onClick={() => setShowForm(true)} className="add-task-button">Add Task</button>
      <div className="task-columns">
        {['To Do', 'In Progress', 'Done'].map((status) => (
          <div key={status} className={`task-column ${status.toLowerCase().replace(' ', '-')}`}>
            <h3>{status}</h3>
            {tasks.filter((task) => task.status === status).map((task) => (
              <div key={task.id} className="task-item">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <div className="task-actions">
                  <button onClick={() => handleEdit(task)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {showForm && (
        <TaskForm task={currentTask} onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default App;
