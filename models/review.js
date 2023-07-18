const mongoose=require("mongoose");

var reviewSchema=new mongoose.Schema({
    text:String,
    created:{type:Date, default:Date.now},
    author:{
         id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserSp"
         },
         username:String
    }
 });
 
 module.exports=mongoose.model("Review",reviewSchema);