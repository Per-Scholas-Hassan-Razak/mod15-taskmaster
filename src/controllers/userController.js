const {createUser, loginUser} = require('../services/userService')
const handleError = require('../utils/handleError')

const createNewUser = async(req, res) => {
    try{
        const {username, email, password,role} = req.body
        const newUser = await createUser({username, email, password, role})
        return res.status(201).json(newUser)
    }catch(error){
        return handleError(error, res)
    }
}

const loginExistingUser = async(req, res) => {
    try{
        const {username, email, password} = req.body
        const user = await loginUser({username, email, password})
        return res.status(200).json(user)
    }catch(error){
        return handleError(error, res)
    }
}


module.exports = {createNewUser, loginExistingUser}