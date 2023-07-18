const mongoose=require('mongoose');
var passportLocalMongoose=require("passport-local-mongoose");

const userSchema=mongoose.Schema(
    { username:String,
      usertype:String,
      password:String,
      userStatus:{type:String, default:"pending"},
      userPower:String,
      requested:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Request'
      }
      ]
    }
);
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("UserSp",userSchema);