import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateJWT } from "../utils/tokenUtils.js";

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check existing user
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email address already exists.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user (verified by default, no email verification needed)
    await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      isVerified: true,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully. You can now log in.",
    });
  } catch (error) {
    console.error("[Auth Controller] Register Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred during registration.",
    });
  }
};

/**
 * @route   GET /api/auth/verify-email
 * @route   POST /api/auth/verify-email
 * @desc    Verify email endpoint (No-op when email verification is disabled)
 */
export const verifyEmail = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Email verification is not required.",
  });
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter both email and password.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateJWT(user._id);

    return res.status(200).json({
      success: true,
      token,
      user: user.toJSON(),
      message: "Login successful.",
    });
  } catch (error) {
    console.error("[Auth Controller] Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login.",
    });
  }
};

/**
 * @route   POST /api/auth/resend-verification
 * @desc    Resend email verification link (Disabled)
 */
export const resendVerificationEmail = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Email verification is disabled. You can log in directly.",
  });
};

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send password reset email (Disabled)
 */
export const forgotPassword = async (req, res) => {
  return res.status(400).json({
    success: false,
    message: "Password reset via email is currently unavailable.",
  });
};

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password (Disabled)
 */
export const resetPassword = async (req, res) => {
  return res.status(400).json({
    success: false,
    message: "Password reset via email is currently unavailable.",
  });
};

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged in user details
 */
export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user profile",
    });
  }
};
