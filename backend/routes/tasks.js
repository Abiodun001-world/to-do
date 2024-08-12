import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
const router = express.Router();

// Get all tasks
router.get("/", getTasks);

// Get single post
router.get("/:id", getTask);

// Create new post
router.post("/", createTask);

// Update post
router.put("/:id", updateTask);

// Delete Post
router.delete("/:id", deleteTask);

export default router;
