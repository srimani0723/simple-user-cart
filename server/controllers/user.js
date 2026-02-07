import User from "../models/User.js";
import {
  generateToken,
  bcryptPassword,
  comparePassword,
} from "../utilities/auth.js";

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashPassword = await bcryptPassword(password);

    const user = await User.insertOne({ username, password: hashPassword });

    res.status(201).json({
      message: "Registration Successful",
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Username" });
    }

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    if (user.token) {
      return res.status(200).json({
        message: "User is already logged in on another device",
      });
    }

    const token = generateToken({ id: user._id, username, password });

    user.token = token;
    await user.save();

    res.status(200).json({
      message: "Login Successful",
      token,
      username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();

    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
