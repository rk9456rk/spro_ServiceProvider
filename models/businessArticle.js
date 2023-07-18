const mongoose=require("mongoose");

var articleBlogSchema=new mongoose.Schema({
    title:String,
    image:String,
    body: String,
    created:{type:Date, default:Date.now}
    ,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"UserSp"
        },
        username:String
    }
 });
 
 module.exports=mongoose.model("BusinessArticle",articleBlogSchema);