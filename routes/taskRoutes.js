import express from "express";
import {
  addTask,
  showTask,
  editTask,
  deleteTask,
  getAllTasksWithUsers,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", addTask);
router.get("/:email", showTask);
router.put("/:id", editTask);
router.delete("/:id", deleteTask);
router.get("/", getAllTasksWithUsers);

export default router;
