import jwt from "jsonwebtoken";
import User from "../models/User.models.js";
import bcrypt from "bcrypt";

const userSignup = async (req, res) => {
  const { email, password } = req.validatedData;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    return res.status(201).json({
      message: "user signedup successfully",
      userId: user._id,
    });
  } catch (e) {
    res.json({
      message: "server error",
      error: e.message,
    });
  }
};

const userSignin = async (req, res) => {
  const { email, password } = req.validatedData;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "email or password incorrect",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Email or password incorrect",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_USER_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "user signedIn",
      user: {
        userId: user._id,
        email: email,
        token,
      },
    });
  } catch (err) {
    return res.status(400).json({
      message: "Something error occured",
    });
  }
};

const resetPassword = async (req, res) => {
  const { password, newPassword } = req.validatedData;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        message: "user not exists",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
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
};

export { userSignup, userSignin, resetPassword };
