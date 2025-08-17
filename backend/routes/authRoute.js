import express from "express";
import { registerUser, loginUser, logoutUser,getMyProfile } from "../controllers/authController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";


const router = express.Router();

// @route   POST /api/auth/register
router.post("/register", registerUser);

// @route   POST /api/auth/login
router.post("/login", loginUser);

// @route   GET /api/auth/logout
router.get("/logout", logoutUser); // optional for now
router.get("/me", isAuthenticated, getMyProfile);


export default router;
