// routes/auth.routes.js
import express from "express";
const userRouter = express.Router();
import { protect, authorize } from "../middlewares/auth.middleware.js";
import {
  register,
  login,
  getCurrentUser,
  updateUserProfile,
  changePassword,
  getAllUsers,
} from "../controllers/user.controller.js";

// Register user
userRouter.post("/register", register);

// Login user
userRouter.post("/login", login);

// Get current user
userRouter.get("/me", protect, getCurrentUser);

// Update user profile
userRouter.put("/profile", protect, updateUserProfile);

// Change password
userRouter.put("/change-password", protect, changePassword);

// Admin routes
userRouter.get("/all", protect, authorize("admin"), getAllUsers);

export default userRouter;
