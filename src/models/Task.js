const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      minlength: [2, "title must be at least 2 characters"],
      maxlength: [200, "title must be at most 200 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, "description must be at most 2000 characters"],
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
      index: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

taskSchema.index({ project: 1, createdAt: -1 });

taskSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
