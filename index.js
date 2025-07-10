import express from "express";
import { userRouter } from "./routes/user.routes.js";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import { taskRouter } from "./routes/task.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.post("/add", (req, res) => {
  res.send("add new task");
});

app.get("/mytasks", (req, res) => {
  res.send("my all tasks");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", taskRouter);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
