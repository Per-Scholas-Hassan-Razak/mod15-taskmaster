const jwt = require('jsonwebtoken')
const { verifyToken } = require('../../utils/jwt')

const requireAuth =  (req, res, next) => {
    const authHeaders = req.headers.authorization || ""

    if(!authHeaders.startsWith("Bearer ")){
        return res.status(401).json({error:"Authentication required"})
    }

    const token = authHeaders.slice(7)

    try{
        const payload = verifyToken(token)
        req.user = payload
        next()
    }catch(error){
        return res.status(401).json({error:"Invalid or expired token"})
    }
}

module.exports = requireAuth
