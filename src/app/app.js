const express = require('express')
const app = express()
const userRoutes = require('../routes/userRoutes')
const projectRoutes = require("../routes/projectRoutes")

app.use(express.json())
app.use("/api/users", userRoutes)
app.use("/api/projects",projectRoutes)


module.exports = app