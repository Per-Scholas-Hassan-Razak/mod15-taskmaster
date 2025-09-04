const Project = require("../models/Project");
const mongoose = require("mongoose")

const createProject = async (proj, user) => {
  const newProject = await Project.create({
    name: proj.name,
    description: proj.description,
    user: user.sub,
  });

  return newProject;
};

const allProjects = async (userId) => {
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        const error = new Error("Invalid user id in token")
        error.statusCode = 401
        throw error
    }
    const projects = await Project.find({user:userId}).lean()
    return projects
}

const deleteExistingProject = async (userId, projectId) => {
    if(
       !projectId || !mongoose.Types.ObjectId.isValid(projectId)
    
    ){
        const error = new Error("Invalid id")
        error.statusCode = 400
        throw error
    }
    const deleted = await Project.findOneAndDelete({_id:projectId, user:userId})
    return deleted
}

const updateExistingProject = async(userId, projectId, newData) => {
    if(
       !projectId || !mongoose.Types.ObjectId.isValid(projectId)
    
    ){
        const error = new Error("Invalid id")
        error.statusCode = 400
        throw error
    }

    const updated = await Project.findOneAndUpdate(
      { _id: projectId, user: userId },
      newData,
      { new: true, runValidators: true }
    );
    return updated
}

module.exports = { createProject, allProjects, deleteExistingProject, updateExistingProject };
