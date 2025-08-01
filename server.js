import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);

const MONGODB_URI = `mongodb+srv://${dbuser}:${dbpass}@todo.dnpsxer.mongodb.net/Todo?retryWrites=true&w=majority&appName=Todo`;
const PORT = 8080;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
  res.json({ message: "Todo Backend API is running!" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
