import express from "express";
const userRouter = express.Router();
import jwt from "jsonwebtoken";
import User from "../models/User.models.js";

userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({
      message: "email and password are required",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        message: "user already exists",
      });
    }

    const user = await User.create({ email, password });
    res.json({
      message: "user signedup successfully",
    });
  } catch (e) {
    res.json({
      message: "server error",
      error: e.message,
    });
  }
});

userRouter.post("/signin", async (req, res) => {});

userRouter.post("/", async (req, res) => {});
export { userRouter };
