const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth/auth");
const {
  createNewProject,
  getAllProjects,
  deleteProject,
  updateProject
} = require("../controllers/projectController");

router.use(requireAuth);

router.get("/", getAllProjects);
router.post("/", createNewProject);
router.delete("/:id", deleteProject);
router.put("/:id", updateProject);

module.exports = router;
