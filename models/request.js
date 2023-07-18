const mongoose=require('mongoose');
/* Status of request .. requested  accepted rejected  completed  */ 
var requestSchema=new mongoose.Schema({
  description:String,
  status:{type:String,default:"requested"},
  createdAt:{type:Date, default:Date.now},
  requesterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSp"
     }
  ,
  providerId:{
       
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvider"
      
  }
});


module.exports=mongoose.model("Request",requestSchema);