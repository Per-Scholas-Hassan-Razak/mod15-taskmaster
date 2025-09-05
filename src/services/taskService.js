const Project = require("../models/Project");
const Task = require("../models/Task");
const mongoose = require("mongoose");

const createTaskForProject = async (userId, projectId, data) => {
  if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    const error = new Error("invalid project id");
    error.statusCode = 400;
    throw error;
  }

  const owner = await Project.exists({ _id: projectId, user: userId });
  if (!owner) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return await Task.create({ ...data, project: projectId });
};

const getAllTasks = async (userId, projectId) => {
  if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    const error = new Error("invalid project id");
    error.statusCode = 400;
    throw error;
  }
  const owner = await Project.exists({ _id: projectId, user: userId });
  if (!owner) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return await Task.find({ project: projectId });
};

const deleteProjectTask = async (userId, projectId, taskId) => {
  if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    const error = new Error("invalid project id");
    error.statusCode = 400;
    throw error;
  }

  if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
    const error = new Error("invalid task id");
    error.statusCode = 400;
    throw error;
  }

  const projectExists = await Project.exists({ _id: projectId, user: userId });
  if (!projectExists) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  const taskExists = await Task.exists({ _id: taskId, project: projectId });
  if (!taskExists) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return await Task.findOneAndDelete({ _id: taskId, project: projectId });
};

const updateProjectTask = async (userId, projectId, taskId, newData) => {
  if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    const error = new Error("invalid project id");
    error.statusCode = 400;
    throw error;
  }

  if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
    const error = new Error("invalid task id");
    error.statusCode = 400;
    throw error;
  }

  const projectExists = await Project.exists({ _id: projectId, user: userId });
  if (!projectExists) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  const taskExists = await Task.exists({ _id: taskId, project: projectId });
  if (!taskExists) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  const allowed = ["title", "description", "status"];
  const patch = Object.fromEntries(
    Object.entries(newData).filter(([k]) => allowed.includes(k))
  );
  if (Object.keys(patch).length === 0) {
    const err = new Error("No updatable fields provided");
    err.statusCode = 400;
    throw err;
  }

  return await Task.findOneAndUpdate(
    { _id: taskId, project: projectId },
    { $set: patch },
    { new: true, runValidators: true }
  );
};

module.exports = {
  createTaskForProject,
  getAllTasks,
  deleteProjectTask,
  updateProjectTask,
};
