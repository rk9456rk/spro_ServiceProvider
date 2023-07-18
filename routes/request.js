var express=require('express');
const { route } = require('./reviews');
var router=express.Router();
var ServiceProvider=require('../models/serviceProvider')
var Request=require("../models/request");
const request = require('../models/request');

//====================
// These routes start with "/request"  
//as added in app.js
router.get("/new/:providerId",(req,res)=>
{ 
  ServiceProvider.findById(req.params.providerId)
  .then((serviceProvider)=>{
    res.render("request/new",{serviceProvider:serviceProvider});
  }).catch((error)=>{
    res.redirect("back");
    console.log("error .. "+error);
  });
    
});

router.post("/new/:providerId",(req,res)=>{
  var newRequest= {description: req.body.description,
                 requesterId: req.user._id,
                 providerId: req.params.providerId
                };


  ServiceProvider.findById(req.params.providerId)
  .then((serviceProvider)=>
       {
                   
        Request.create(newRequest)
             .then((request)=>{ 
               console.log("request created");
               console.log(request);


               var user1=req.user;
                console.log("user1");
                console.log(user1);
               user1.requested.push(request._id);
               console.log(" id push in user");
               serviceProvider.requests.push(request._id);
               console.log(" id push in serviceProvider");

               user1.save().then(()=>{
                console.log("request  request id is added in user");
               }).catch((error)=>{ console.log("error .. "+error);});
              
               serviceProvider.save().then(()=>{
                console.log("request  request id is added in serviceProvider");
               }).catch((error)=>{ console.log("error .. "+error);}); 

              })
              .catch((error)=>{
               res.redirect("back");
               console.log("error .. "+error);
              });
       })
   .catch((error)=>{
                   res.redirect("back");
                   console.log("error .. "+error);
                   });
    res.redirect("/profile/myRequest");
});                   
 
router.get("/:id",(req,res)=>{
  Request.findById(req.params.id).populate('providerId requesterId')
  .then((request)=>{
    res.render("request/show",{request:request});
  }).catch((error)=>{
    res.redirect("back");
    console.log("error .. "+error);
    });
});


module.exports=router;