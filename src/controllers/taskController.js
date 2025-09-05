const handleError = require("../utils/handleError");
const { createTaskForProject, getAllTasks } = require("../services/taskService");

const createTask = async (req, res) => {
  try {
    const { sub } = req.user;
    const { projectId } = req.params;
    const { title, description, status } = req.body;
    if (!title) {
      const error = new Error("title is required");
      error.statusCode = 400;
      throw error;
    }

    const newTask = await createTaskForProject(sub, projectId, {
      title,
      description,
      status,
    });
    return res.status(201).json(newTask);
  } catch (error) {
    console.error("unable to create task", error.message);
    return handleError(error, res);
  }
};

const allTasks = async (req, res) => {
  try {
    const { sub } = req.user;
    const { projectId } = req.params;
    const tasks = await getAllTasks(sub,projectId)
    return res.status(200).json(tasks)
  } catch (error) {
    console.error("unable to retrieve tasks", error.message);
    return handleError(error, res);
  }
};

module.exports = { createTask, allTasks };
