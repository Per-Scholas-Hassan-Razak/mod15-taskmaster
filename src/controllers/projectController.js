const handleError = require("../utils/handleError");
const {createProject, allProjects, deleteExistingProject} = require("../services/projectService")

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

const getAllProjects = async(req, res) => {
  try{
    const userId = req.user?.sub
    const projects = await allProjects(userId)
    return res.status(200).json(projects)
  }catch(error){
    console.error("failed to load projects", error.message)
    return handleError(error,res)
  }
 
}

const deleteProject = async(req, res) => {
  try{
    const userId = req.user.sub
    const projectId = req.params.id
    const deleted = await deleteExistingProject(userId, projectId)
    if(!deleted){
      const error = new Error("Resource Not found!")
      error.statusCode = 404
      throw error
    }
    return res.status(204).end()
  }catch(error){
     console.error("Unable to delete project", {
      projectId: req.params?.id,
      userId: req.user?.sub,
      message: error.message,
    });
    return handleError(error,res)
    
  }
 
}

module.exports = {createNewProject, getAllProjects, deleteProject}
