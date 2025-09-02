const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
  name:{
    type:String, 
    required:[true, "name is required"]
  }, 
  description:{
    type:String, 
    required:[true, "description is required"]
  }, 
  user:{
    type:Schema.Types.ObjectId, 
    ref:"User",
    required:true
  }, 
},
{timestamps:true}

);


const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
