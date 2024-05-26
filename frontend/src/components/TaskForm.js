import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '', status: '', dueDate: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = location.state && location.state.task;

  useEffect(() => {
    if (isEditing) {
      setTask(location.state.task);
    }
  }, [isEditing, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      axios.put(`http://localhost:3001/tasks/${task.id}`, task).then(() => {
        navigate('/');
      });
    } else {
      axios.post('http://localhost:3001/tasks', task).then(() => {
        navigate('/');
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={task.title} onChange={handleChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={task.description} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label>Due Date:</label>
        <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
      </div>
      <button type="submit">{isEditing ? 'Update' : 'Create'} Task</button>
    </form>
  );
};

export default TaskForm;
