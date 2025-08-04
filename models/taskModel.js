import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: "Pending" },
    isConfirmed: { type: Boolean, default: false }, // ✅ NEW FIELD
    email: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("task", taskSchema);
