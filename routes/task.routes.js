import express from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { taskSchema, updateTaskSchema } from "../schemas/task.schemas.js";
import { validateRequest } from "../middlewares/validateRequest.middlewares.js";
const taskRouter = express.Router();
import {
  addTask,
  deleteTask,
  myTasks,
  updateTask,
} from "../controllers/task.controllers.js";

taskRouter.post("/add", validateRequest(taskSchema), authenticate, addTask);
taskRouter.get("/", authenticate, myTasks);
taskRouter.put(
  "/:id",
  validateRequest(updateTaskSchema),
  authenticate,
  updateTask
);
taskRouter.delete("/:id", authenticate, deleteTask);

export { taskRouter };
