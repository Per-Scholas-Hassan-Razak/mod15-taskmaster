require('dotenv').config()
const app = require('./src/app/app')
const connectDB = require('./src/config/connection')
const port = process.env.PORT

connectDB().then(() => {
    app.listen(port,() => {
        console.log(`Express Server running on http://localhost:${port}`)
    })
})

