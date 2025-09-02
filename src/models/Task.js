const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  title:{
    type:String, 
    required:[true, "title is required"]
  }, 
  description:{
    type:String, 
    required:[true, "description is required"]
  }, 
  status:{
    type:String, 
    enum:["To Do", "In Progress", "Done"], 
    default:"To Do"
  }, 
  project:{
    type:Schema.Types.ObjectId, 
    ref:"Project",
    required:true
  }, 
},
{timestamps:true}

);


const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
