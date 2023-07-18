const mongoose=require("mongoose");
var userSchema=require('./user');
var serviceProviderSchema=new mongoose.Schema({
    name: {type:String ,default:"xxxxxx"},
    serviceType:{type:String ,default:"xxxxxx"},
    contactNumber:{type:String ,default:"xxxxxx"},
    profilePhoto:{type:String ,default:"xxxxxx"},
    description:{type:String ,default:"xxxxxx"},
    requests:[{
      id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'requests'
      }
    }],
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],

});

//var ServiceProvider=mongoose.model("ServiceProvider",serviceProviderSchema);

module.exports=userSchema.discriminator("ServiceProvider",serviceProviderSchema);
/*const mongoose=require("mongoose");

var serviceProviderSchema=new mongoose.Schema({
    name:String,
    serviceType:String,
    contactNumber:String,
    profilePhoto:String,
    description:String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"UserSp"
        },
        username:String
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],

});

//var ServiceProvider=mongoose.model("ServiceProvider",serviceProviderSchema);

module.exports=mongoose.model("ServiceProvider",serviceProviderSchema);*/