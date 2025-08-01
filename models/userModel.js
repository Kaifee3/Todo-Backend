import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  mobile: { type: String },
  gender: { type: String },
  password: { type: String },
  role: { type: String, default: "user" },
}, { timestamps: true });

export default mongoose.model("user", userSchema);
