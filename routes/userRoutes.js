import express from 'express';
import {
  registerUser,
  loginUser,
  getUserByEmail,
  updateUser,
  getAllUsers
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';
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
    res.status(500).json({ message: "Server error" });
  }
});

Router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const deleted = await userModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error while deleting user" });
  }
});

Router.delete("/delete-user", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    const deleted = await userModel.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default Router;
