const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt  = require('bcrypt')


const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; 

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim:true,
    unique:true,
    minLength:2,
    maxLength:80
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim:true,
    lowercase:true,
    match:[EMAIL_REGEX, "Invalid email address"],
    index:true
  },
  password: {
    type: String,
    required: [true, "email is required"],
    select:false
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user"
  }, 
},
{timestamps:true}

);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);         
    this.password = await bcrypt.hash(this.password, salt); 
    next();
  } catch (err) {
    next(err);
  }
});


userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString(); 
    delete ret._id;              
    delete ret.__v;              
    delete ret.password;         
    return ret;
  },
});


const User = mongoose.model("User", userSchema);

module.exports = User;
