import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign(
      { 
        id: existingUser._id, 
        email: existingUser.email,
        role: existingUser.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    const userObj = {
      id: existingUser._id,
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      role: existingUser.role,
    };

    res.status(200).json({ userObj, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password"); // Hide passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      gender,
      password,
      confirmPassword,
    } = req.body;

    if (!firstName || !lastName || !email || !mobile || !gender || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const user = {
      firstName,
      lastName,
      email,
      mobile,
      gender,
      password: hashedPwd,
      role: "user",
    };

    const result = await userModel.create(user);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

export const updateUser = async (req, res) => {
  try {
    const {
      originalEmail, // the email to identify the user
      email, firstName, lastName, mobile, gender, role
    } = req.body;

    const updatedUser = await userModel.findOneAndUpdate(
      { email: originalEmail },
      { email, firstName, lastName, mobile, gender, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user" });
  }
};

