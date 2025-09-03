const User = require('../models/User')

const createUser = async(data) => {
    const existingUser = await User.findOne({ email:data.email });
    if(existingUser){
        const error = new Error("Email is already taken!")
        error.statusCode = 409
        throw error
    }
    const newUser = await User.create({username:data.username,email:data.email, password:data.password, role:data.role})
    return newUser
}


module.exports = {createUser}