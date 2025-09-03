const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET


const signToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn:"1h"})
}

module.exports = {signToken}