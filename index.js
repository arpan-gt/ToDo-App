import express from "express";
import { userRouter } from "./routes/user.routes.js";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import { taskRouter } from "./routes/task.routes.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDB();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", taskRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
