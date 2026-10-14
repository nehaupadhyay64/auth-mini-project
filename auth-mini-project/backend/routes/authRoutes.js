import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
router.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({ message: `Welcome! Your user ID is ${req.userId}` });
});

export default router;