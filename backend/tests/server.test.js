import request from "supertest";

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
