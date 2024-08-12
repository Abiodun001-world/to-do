// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import tasks from "./routes/tasks.js";

const app = express();
const port = 3001;

// Body parser middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/tasks", tasks);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
