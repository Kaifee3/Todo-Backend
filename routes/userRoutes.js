import express from 'express';
import {
  registerUser,
  loginUser,
  getUserByEmail,
  updateUser,
  getAllUsers  
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js'; // ✅ fixed import
import userModel from '../models/userModel.js';

const Router = express.Router();

Router.post("/register", registerUser);
Router.post("/login", loginUser);
Router.post("/get-user", getUserByEmail);
Router.put("/update-user", updateUser);
Router.get("/", getAllUsers);

Router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user in /me:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default Router;
