const express = require("express");
const router = express.Router();
const {createNewUser, loginExistingUser} = require('../controllers/userController')

router.post("/register", createNewUser);

router.post("/login", loginExistingUser);

module.exports = router;
