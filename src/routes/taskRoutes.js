const express = require('express')
const router = express.Router({mergeParams:true})
const requireAuth = require("../middleware/auth/auth")
const {createTask} = require("../controllers/taskController")

router.use(requireAuth)

router.post("/", createTask)



module.exports = router