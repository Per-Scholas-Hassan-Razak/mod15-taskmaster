const Project = require("../models/Project")

const createProject = async(proj, user ) => {
    const newProject = await Project.create({
        name:proj.name, 
        description:proj.description,
        user:user.sub
    })

    return newProject

}

module.exports = {createProject}