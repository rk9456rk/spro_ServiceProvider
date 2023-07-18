const mongoose=require("mongoose");
var userSchema=require('./user');
var serviceProviderSchema=new mongoose.Schema({
    name: {type:String ,default:"xxxxxx"},
    serviceType:{type:String ,default:"xxxxxx"},
    contactNumber:{type:String ,default:"xxxxxx"},
    profilePhoto:{type:String ,default:"xxxxxx"},
    description:{type:String ,default:"xxxxxx"},
    requests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Request'
    
    }],
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],

});

//var ServiceProvider=mongoose.model("ServiceProvider",serviceProviderSchema);

module.exports=userSchema.discriminator("ServiceProvider",serviceProviderSchema);