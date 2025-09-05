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

  return await Task.find({ project: projectId })
};

module.exports = { createTaskForProject, getAllTasks };
