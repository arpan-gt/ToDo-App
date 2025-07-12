import express from "express";
import { Todo } from "../models/Todo.models.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const taskRouter = express.Router();

// Add a Todo
taskRouter.post("/add", authenticate, async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.userId;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and Description are required" });
  }

  try {
    const existingTask = await Todo.findOne({ title, userId });
    if (existingTask) {
      return res.status(400).json({ message: "Todo Already Exists" });
    }

    const task = await Todo.create({ title, description, userId });

    res.status(201).json({
      message: "Todo task created",
      task,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
});

// Get all Todos
taskRouter.get("/", authenticate, async (req, res) => {
  const userId = req.user.userId;

  try {
    const todos = await Todo.find({ userId });
    res.json({
      message: "all todos",
      todos,
    });
  } catch (e) {
    res.status(500).json({ message: "Server Error", error: e.message });
  }
});

//updateExistingTask
taskRouter.put("/:id", authenticate, async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.userId;
  const taskId = req.params.id;

  if (!title && !description) {
    return res.status(400).json({
      message: "At least one of title or description must be provided",
    });
  }

  try {
    const task = await Todo.findOne({ _id: taskId, userId });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    if (title) task.title = title;
    if (description) task.description = description;

    await task.save();

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

// delete task
taskRouter.delete("/:id", async (req, res) => {
   try {
     const taskId = req.params.id;
 
    const task = await Todo.findOneAndDelete({ _id: taskId});

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" });
    }
    return res.status(200).json({
      message: "Task deleted successfully",
      task,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});
export { taskRouter };
