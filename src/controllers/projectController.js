const handleError = require("../utils/handleError");
const {createProject} = require("../services/projectService")

const createNewProject = async (req, res) => {
  try {
    const {sub, role} = req.user
    const {name, description} = req.body
    if(!name || !description){
        const error = new Error("Missing name or description")
        error.statusCode=400
        throw error
    }

    const newProject = await createProject(req.body,req.user)
    return res.status(201).json(newProject)
  } catch (error) {
    console.error({ error: error.message });
    return handleError(error, res)
  }
};

module.exports = {createNewProject}
