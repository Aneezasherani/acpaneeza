import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";

import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public Routes (No token required)
router.post("/register", registerUser);  // Register a new user
router.post("/login", loginUser);        // Log in and receive JWT

// ✅ Protected Routes (Only logged-in users can access)
router.get("/profile", protect, getUserProfile); // Get logged-in user profile

// ✅ Admin-only Routes (Only admins can manage all users)
router.get("/", protect, requireRole("admin"), getAllUsers);     // List all users
router.delete("/:id", protect, requireRole("admin"), deleteUser); // Delete a user by ID

export default router;
