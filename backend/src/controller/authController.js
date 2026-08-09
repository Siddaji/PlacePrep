import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateRandomToken, hashToken, generateJWT } from "../utils/tokenUtils.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../services/emailService.js";

/**
 * @route   POST /api/auth/register
 * @desc    Register new user and send verification email
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

    if (password !== confirmPassword) {
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

    // Generate verification token
    const { rawToken, hashedToken } = generateRandomToken();
    const tokenExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      isVerified: false,
      verificationToken: hashedToken,
      verificationTokenExpiry: tokenExpiry,
    });

    // Send verification email
    await sendVerificationEmail(normalizedEmail, rawToken);

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please check your email to verify your account.",
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
 * @desc    Verify email using token
 */
export const verifyEmail = async (req, res) => {
  try {
    const rawToken = req.query.token || req.body.token;

    if (!rawToken) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required.",
      });
    }

    const hashedToken = hashToken(rawToken);

    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Verification link is invalid or expired.",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error("[Auth Controller] Verify Email Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during email verification.",
    });
  }
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

    // Reject login if email is not verified
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        isVerified: false,
        message: "Please verify your email before logging in.",
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
 * @desc    Resend email verification link
 */
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email address.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (user && !user.isVerified) {
      const { rawToken, hashedToken } = generateRandomToken();
      user.verificationToken = hashedToken;
      user.verificationTokenExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
      await user.save();

      await sendVerificationEmail(normalizedEmail, rawToken);
    }

    // Safe response (does not leak account presence)
    return res.status(200).json({
      success: true,
      message: "If an unverified account exists with that email, a verification link has been sent.",
    });
  } catch (error) {
    console.error("[Auth Controller] Resend Verification Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while resending the verification email.",
    });
  }
};

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send password reset email
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email address.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (user) {
      const { rawToken, hashedToken } = generateRandomToken();
      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 mins
      await user.save();

      await sendPasswordResetEmail(normalizedEmail, rawToken);
    }

    return res.status(200).json({
      success: true,
      message: "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("[Auth Controller] Forgot Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred processing your forgot password request.",
    });
  }
};

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password using reset token
 */
export const resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Password reset token is missing.",
      });
    }

    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all password fields.",
      });
    }

    if (password !== confirmPassword) {
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

    const hashedToken = hashToken(token);

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Password reset link is invalid or expired.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });
  } catch (error) {
    console.error("[Auth Controller] Reset Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during password reset.",
    });
  }
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
