const {createUser} = require('../services/userService')
const handleError = require('../utils/handleError')

const createNewUser = async(req, res) => {
    try{
        const {username, email, password,role} = req.body
        const newUser = await createUser({username, email, password, role})
        res.status(201).json(newUser)
    }catch(error){
        handleError(error, res)
    }
}


module.exports = {createNewUser}