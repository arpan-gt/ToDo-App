import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.models.js";
import bcrypt from "bcrypt";
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
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
    return res.json({
      message: "user signedup successfully",
    });
  } catch (e) {
    res.json({
      message: "server error",
      error: e.message,
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      message: "All fields are required",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      message: "email or password incorrect",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Email or password incorrect",
    });
  }

  const token = jwt.sign({ userId: user._id }, "SECRET", { expiresIn: "1h" });

  return res.json({
    message: "user signedIn",
    user: {
      userId: user._id,
      email: email,
      token,
    },
  });
});

userRouter.post("/", async (req, res) => {});
export { userRouter };
