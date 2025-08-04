import { Task } from "../models/Task.models";

//add Task controller
const addTask = async (req, res) => {
  const { title, description } = req.validatedData;
  const userId = req.userId;

  try {
    const existingTask = await Task.findOne({ title, userId });
    if (existingTask) {
      return res.status(400).json({ message: "Task Already Exists" });
    }

    const task = await Task.create({ title, description, userId });

    res.status(201).json({
      message: "Task created",
      task,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

const myTasks = async (req, res) => {
  const userId = req.userId;

  try {
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.json({
      message: tasks.length ? "Task retrieved" : "No task found",
      tasks,
    });
  } catch (e) {
    res.status(500).json({ message: "Server Error", error: e.message });
  }
};

const updateTask = async (req, res) => {
  const { title, description } = req.validatedData;
  const userId = req.userId;
  const taskId = req.params.id;

  if (!title && !description) {
    return res.status(400).json({
      message: "At least one of title or description must be provided",
    });
  }

  try {
    const task = await Task.findOne({ _id: taskId, userId });

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
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.userId;

  try {
    const task = await Task.findOneAndDelete({ _id: taskId, userId });

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
};
export { addTask, myTasks, updateTask,deleteTask };
