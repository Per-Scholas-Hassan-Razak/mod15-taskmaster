const express = require("express");
const router = express.Router();
const {createNewUser} = require('../controllers/userController')

router.post("/register", createNewUser);

router.post("/login", (req, res) => {
  console.log("login an existing user");
});

module.exports = router;
