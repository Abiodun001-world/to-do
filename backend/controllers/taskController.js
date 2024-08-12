let tasks = [];
let currentId = 1;

// GET /tasks: Retrieve all tasks
export const getTasks =
  ("/tasks",
  (req, res) => {
    res.json(tasks);
  });

// GET /tasks/:id: Retrieve a single task by ID
export const getTask =
  ("/tasks/:id",
  (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (task) {
      res.json(task);
    } else {
      res.status(404).send("Task not found");
    }
  });

// POST /tasks: Create a new task
export const createTask =
  ("/tasks",
  (req, res) => {
    const task = { id: currentId++, ...req.body };
    tasks.push(task);
    res.status(201).json(task);
  });

// PUT /tasks/:id: Update an existing task by ID
export const updateTask =
  ("/tasks/:id",
  (req, res) => {
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (index !== -1) {
      tasks[index] = { id: tasks[index].id, ...req.body };
      res.json(tasks[index]);
    } else {
      res.status(404).send("Task not found");
    }
  });

// DELETE /tasks/:id: Delete a task by ID
export const deleteTask =
  ("/tasks/:id",
  (req, res) => {
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (index !== -1) {
      tasks.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).send("Task not found");
    }
  });