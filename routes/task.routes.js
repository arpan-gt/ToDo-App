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

export { taskRouter };
