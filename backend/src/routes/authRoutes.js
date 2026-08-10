import express from "express";
import {
  registerUser,
  verifyEmail,
  loginUser,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  getMe,
} from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isDBConnected } from "../config/db.js";

const router = express.Router();

// Middleware to check database connectivity for auth routes
const requireDB = (req, res, next) => {
  if (!isDBConnected()) {
    return res.status(503).json({
      success: false,
      message: "Database service unavailable. Please configure MONGODB_URI in environment settings (e.g., MongoDB Atlas connection URL).",
    });
  }
  next();
};

router.use(requireDB);

router.post("/register", registerUser);
router.get("/verify-email", verifyEmail);
router.post("/verify-email", verifyEmail);
router.post("/login", loginUser);
router.post("/resend-verification", resendVerificationEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", protect, getMe);

export default router;

