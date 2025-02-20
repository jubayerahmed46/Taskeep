const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/db/db");
const rootHtml = require("./rootHtml");
require("dotenv").config();

const tasksRoute = require("./src/routes/todo");
const usersRoute = require("./src/routes/users");

// setUp port and application
const port = process.env.PORT || 55555;
const app = express();

// call the the function before calling 'app' object. otherwise, there might error.
connectDB();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

// routes
app.use("/api/tasks", tasksRoute);
app.use("/api/users", usersRoute);

app.get("/", (_, res) => {
  res.send(rootHtml);
});

app.listen(port, () => {
  console.log(`the server running port on: ${port}`);
});
