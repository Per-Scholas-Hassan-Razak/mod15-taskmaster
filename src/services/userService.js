const User = require('../models/User')
const {signToken} = require('../utils/jwt')

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

const loginUser = async(data) => {
    const existingUser = await User.findOne({ email:data.email }).select("+password");
    if(!existingUser){
        const error = new Error("Incorrect email or password")
        error.statusCode = 401
        throw error
    }

    const ok = await existingUser.comparePassword(data.password)
    if(!ok){
        const error = new Error("Incorrect email or password")
        error.statusCode = 401
        throw error
    }

    const token = signToken({sub:existingUser.id, role:existingUser.role})
    return {token: token, 
        user:{
        _id:existingUser.id,
        role:existingUser.role
    }}
}


module.exports = {createUser, loginUser}