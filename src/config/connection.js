require('dotenv').config()
const mongoose   = require('mongoose')
const uri = process.env.MONGO_URI

const connectDB = async() => {
    try{
         const conn = await mongoose.connect(uri)
         console.log(`connected to Mongo Database: ${conn.connection.host}`)
    }catch(error){
        console.error("Error connecting to database", error.message)
    }
}

module.exports = connectDB