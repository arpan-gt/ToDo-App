import express from "express";

const userRouter = express.Router();
import { userSchema, resetPasswordSchema } from "../schemas/user.schemas.js";
import { validateRequest } from "../middlewares/validateRequest.middlewares.js";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { resetPassword, userSignup } from "../controllers/user.controllers.js";

userRouter.post("/signup", validateRequest(userSchema), userSignup);
userRouter.post("/signin", validateRequest(userSchema));
userRouter.post(
  "/resetPassword",
  validateRequest(resetPasswordSchema),
  authenticate,
  resetPassword
);
export { userRouter };
