import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style/TaskForm.css';

const TaskForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post('http://192.168.29.106:8000/api/tasks/', {
          title,
          description,
          status,
        });
        onSave(response.data);
      } catch (err) {
        setError('Failed to save task. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill out both title and description.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="task-form">
        <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <div className="savebutton">
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Task'}
            </button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default TaskForm;
