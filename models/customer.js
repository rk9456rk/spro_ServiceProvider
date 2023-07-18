const mongoose=require("mongoose");
var UserSchema=require('./user');
var customerSchema= new mongoose.Schema({
    name: {type: String, default:"xxxxxxx"},
    contactNumber:{type:String,default:"xxxxxxxx"},
    requestMade:[{
        id:{ type: mongoose.Schema.Types.ObjectId,
             ref: "Request"
        }
    }]
});

module.exports=UserSchema.discriminator('customer',customerSchema);