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

projectSchema.index({ user: 1, name: 1 }, { unique: true });

projectSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});



const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
