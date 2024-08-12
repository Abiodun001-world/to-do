import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

let tasks = [];
let currentId = 1;

// GET /tasks: Retrieve all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id: Retrieve a single task by ID
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).send("Task not found");
  }
});

// POST /tasks: Create a new task
app.post("/tasks", (req, res) => {
  const task = { id: currentId++, ...req.body };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id: Update an existing task by ID
app.put("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index !== -1) {
    tasks[index] = { id: tasks[index].id, ...req.body };
    res.json(tasks[index]);
  } else {
    res.status(404).send("Task not found");
  }
});

// DELETE /tasks/:id: Delete a task by ID
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Task not found");
  }
});

describe("Task API", () => {
  it("should create a new task", async () => {
    const response = await request(app).post("/tasks").send({
      title: "Test Task",
      description: "Description",
      status: "pending",
      dueDate: "2023-12-31",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should retrieve all tasks", async () => {
    const response = await request(app).get("/tasks");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should retrieve a task by ID", async () => {
    const response = await request(app).get("/tasks/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
  });

  it("should update a task by ID", async () => {
    const response = await request(app).put("/tasks/1").send({
      title: "Updated Task",
      description: "Updated Description",
      status: "completed",
      dueDate: "2024-01-01",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("title", "Updated Task");
  });

  it("should delete a task by ID", async () => {
    const response = await request(app).delete("/tasks/1");
    expect(response.statusCode).toBe(204);
  });

  it("should return 404 for a non-existent task", async () => {
    const response = await request(app).get("/tasks/999");
    expect(response.statusCode).toBe(404);
  });
});
