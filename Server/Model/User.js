const mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase: true
    },
    password:{
        type:String,
        required:true
    },
     role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    

},
 { timestamps: true }
);

module.exports.User = mongoose.model("user",UserSchema);