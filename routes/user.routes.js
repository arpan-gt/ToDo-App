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

userRouter.post("/resetPassword", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  if (!email || !oldPassword || !newPassword) {
    return res.status(401).json({
      message: "all fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "user not exists",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    user.password = newPassword;
    await user.save();
    return res.status(200).json({
      message: "password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
});
export { userRouter };
