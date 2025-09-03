const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth/auth");
const {createNewProject} =  require('../controllers/projectController')

router.use(requireAuth);

router.post("/", createNewProject);

module.exports = router
