import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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

  const validateForm = () => {
    const newErrors = {};
    if (!task.title) newErrors.title = "Title is required";
    if (!task.description) newErrors.description = "Description is required";
    if (!task.status) newErrors.status = "Status is required";
    if (!task.dueDate) newErrors.dueDate = "Due date is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        await axios.put(`${NEXT_PUBLIC_API_URL}/api/task/${task.id}`, task);
      } else {
        await axios.post(`${NEXT_PUBLIC_API_URL}`, task);
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      setErrors({ submit: error.response?.data?.message || "There was an issue submitting the form." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
        />
        {errors.title && <span>{errors.title}</span>}
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
        ></textarea>
        {errors.description && <span>{errors.description}</span>}
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="">Please select</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        {errors.status && <span>{errors.status}</span>}
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />
        {errors.dueDate && <span>{errors.dueDate}</span>}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : isEditing ? "Update" : "Create"} Task
      </button>
      {errors.submit && <div>{errors.submit}</div>}
    </form>
  );
};

export default TaskForm;
