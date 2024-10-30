import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/task`);
        
        setTasks(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("Failed to fetch tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${NEXT_PUBLIC_API_URL}/api/task${id}`);
        setTasks(tasks.filter((task) => task.id !== id));
      } catch (err) {
        setError("Failed to delete task. Please try again later.");
      }
    }
  };

  const handleEdit = (task) => {
    navigate(`/edit/${task.id}`, { state: { task } });
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Task List</h2>
      <button onClick={() => navigate("/new")}>Add Task</button>
      {Array.isArray(tasks) && tasks.length === 0 ? (
        <p>No tasks available. Add a new task to get started!</p>
      ) : (
        tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
