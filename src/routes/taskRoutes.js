const express = require('express')
const router = express.Router({mergeParams:true})
const requireAuth = require("../middleware/auth/auth")
const {createTask, allTasks,deleteTask,updateTask} = require("../controllers/taskController")

router.use(requireAuth)

router.post("/", createTask)
router.get("/", allTasks)
router.delete("/:taskId", deleteTask)
router.put("/:taskId", updateTask)




module.exports = router