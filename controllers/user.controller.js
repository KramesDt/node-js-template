// routes/auth.routes.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Register user

export const register  = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      role
    });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

// Login user
export const login = async (req, res) => {  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Create token
    const token = sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        organizationName: user.organizationName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {  
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting user profile",
      error: error.message,
    });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {  try {
    const { organizationName } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { organizationName },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

// Change password
export const changePassword = async (req, res) => {  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error changing password",
      error: error.message,
    });
  }
};

// Admin routes
export const getAllUsers = async (req, res) => {  try {
    const users = await User.find().select("-password").sort("-createdAt");

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
};