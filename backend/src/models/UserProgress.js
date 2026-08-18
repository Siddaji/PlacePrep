import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resourceType: {
      type: String,
      required: true,
      enum: ["dsa", "company-dsa", "system-design", "os", "oop", "subjects"],
      default: "dsa",
      index: true,
    },
    resourceId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "in_progress", "incomplete"],
      default: "completed",
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index to prevent duplicate progress records per user, resourceType, and resourceId
userProgressSchema.index(
  { userId: 1, resourceType: 1, resourceId: 1 },
  { unique: true }
);

const UserProgress =
  mongoose.models.UserProgress ||
  mongoose.model("UserProgress", userProgressSchema);

export default UserProgress;
