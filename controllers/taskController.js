import taskModel from "../models/taskModel.js";

const addTask = async (req, res) => {
  try {
    const { title, description, email, userId } = req.body;

    if (!email || !title) {
      return res.status(400).json({ message: "Email and Title are required" });
    }

    const newTask = {
      title,
      description,
      email,
      userId,
    };

    const result = await taskModel.create(newTask);
    res.status(201).json(result);
  } catch (err) {
    console.error("❌ Error adding task:", err);
    res.status(500).json({ message: "Something went wrong while adding task" });
  }
};

const showTask = async (req, res) => {
  try {
    const { email } = req.params;

    const result = await taskModel
      .find({ email })
      .sort({ createdAt: -1 });

    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error fetching tasks:", err);
    res.status(500).json({ message: "Something went wrong while retrieving tasks" });
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const result = await taskModel.findByIdAndUpdate(id, updates, { new: true });

    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error updating task:", err);
    res.status(500).json({ message: "Something went wrong while updating task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await taskModel.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting task:", err);
    res.status(500).json({ message: "Something went wrong while deleting task" });
  }
};

const getAllTasksWithUsers = async (req, res) => {
  try {
    const tasks = await taskModel
      .find()
      .populate("userId", "firstName lastName email");

    res.status(200).json(tasks);
  } catch (err) {
    console.error("❌ Error fetching all tasks:", err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

export {
  addTask,
  showTask,
  editTask,
  deleteTask,
  getAllTasksWithUsers
};
