import React from "react";

const Task = ({ task, onDelete, onEdit }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      <p>Due Date: {task.dueDate}</p>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
