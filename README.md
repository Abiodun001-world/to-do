# To-Do List Application

## Introduction
This is a simple To-Do List application that allows users to manage their tasks. The application supports creating, reading, updating, and deleting (CRUD) tasks. Each task has a title, description, status, and due date.

## Features
- Display a list of all tasks with their title, status, and due date.
- Create a new task.
- Edit an existing task.
- Delete a task.

## Technologies Used
- Backend: Node.js with Express
- Frontend: React, Axios
- Testing: Jest, Supertest, React Testing Library

## Getting Started

### Prerequisites
- Node.js
- npm

### Setup

#### Backend
1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Run the server:
    ```bash
    node server.js
    ```

#### Frontend
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Run the application:
    ```bash
    npm start
    ```

## Running Tests

### Backend Tests
1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Run the tests:
    ```bash
    npm test
    ```

### Frontend Tests
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2. Run the tests:
    ```bash
    npm test
    ```

## API Endpoints
- `GET api/tasks`: Retrieve all tasks.
- `GET api/tasks/:id`: Retrieve a single task by ID.
- `POST api/tasks`: Create a new task.
- `PUT api/tasks/:id`: Update an existing task by ID.
- `DELETE api/tasks/:id`: Delete a task by ID.

## Testing the API with Postman

1. **Install Postman:**
   Download and install Postman from the [official website](https://www.postman.com/downloads/).

2. **Start the Backend Server:**
   Make sure your backend server is running. You can start it by navigating to the backend directory and running:
   ```bash
   cd backend
   node server.js
   ```

3. **Create a Postman Collection:**
   - Open Postman and create a new collection named "To-Do List API".

4. **Add Requests to the Collection:**

   - **Retrieve All Tasks (GET api/tasks):**
     - Method: GET
     - URL: `http://localhost:3001/tasks`
     - Click "Send" to test the endpoint.

   - **Retrieve a Single Task (GET api/tasks/:id):**
     - Method: GET
     - URL: `http://localhost:3001/api/tasks/1` (replace `1` with the ID of a task you want to retrieve)
     - Click "Send" to test the endpoint.

   - **Create a New Task (POST api/tasks):**
     - Method: POST
     - URL: `http://localhost:3001/api/tasks`
     - Body: Select "raw" and "JSON", then add the following JSON:
       ```json
       {
         "title": "New Task",
         "description": "New Task Description",
         "status": "pending",
         "dueDate": "2023-12-31"
       }
       ```
     - Click "Send" to create a new task.

   - **Update a Task (PUT api/tasks/:id):**
     - Method: PUT
     - URL: `http://localhost:3001/api/tasks/1` (replace `1` with the ID of the task you want to update)
     - Body: Select "raw" and "JSON", then add the following JSON:
       ```json
       {
         "title": "Updated Task",
         "description": "Updated Task Description",
         "status": "completed",
         "dueDate": "2024-01-01"
       }
       ```
     - Click "Send" to update the task.

   - **Delete a Task (DELETE api/tasks/:id):**
     - Method: DELETE
     - URL: `http://localhost:3001/api/tasks/1` (replace `1` with the ID of the task you want to delete)
     - Click "Send" to delete the task.
