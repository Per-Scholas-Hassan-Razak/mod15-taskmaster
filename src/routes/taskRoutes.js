const express = require('express')
const router = express.Router({mergeParams:true})
const requireAuth = require("../middleware/auth/auth")
const {createTask, allTasks} = require("../controllers/taskController")

router.use(requireAuth)

router.post("/", createTask)
router.get("/", allTasks)




module.exports = router