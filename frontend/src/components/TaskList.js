import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Task from './Task';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/tasks').then(response => {
      setTasks(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`).then(() => {
      setTasks(tasks.filter(task => task.id !== id));
    });
  };

  const handleEdit = (task) => {
    navigate(`/edit/${task.id}`, { state: { task } });
  };

  return (
    <div>
      <h2>Task List</h2>
      <button onClick={() => navigate('/new')}>Add Task</button>
      {tasks.map(task => (
        <Task key={task.id} task={task} onDelete={handleDelete} onEdit={handleEdit} />
      ))}
    </div>
  );
};

export default TaskList;
