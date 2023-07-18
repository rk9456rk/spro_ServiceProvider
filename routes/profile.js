var express=require('express');
var router=express.Router();
var User=require('../models/user');
var Request=require('../models/request');
var middleWare=require('../middleware/index');

router.get("/profile/myRequest", (req,res)=>{
   //userId1='64b531eddcb2079af5de7d3a';
   
    User.findById(req.user._id).populate("requested")
   .then((user)=>{
            res.render("profile/myRequest",{Title:"My Request",requests:user.requested});
        })
   .catch((error)=>{
       console.log("error "+error);
   });
  
});
router.get("/profile/requestForMe",middleWare.isLoggedIn,middleWare.checkIsProvider,(req,res)=>{
   // userId1='64b531eddcb2079af5de7d3a';
    
     User.findById(req.user._id).populate("requests")
    .then((user)=>{
             res.render("profile/myRequest",
              {Title:"Request For Me",requests:user.requests});
         })
    .catch((error)=>{
        console.log("error "+error);
    });
   
 });
/*
router.get("/profile/myRequest",async (req,res)=>{
    
    await User.findById(req.user._id)
    .then(async (user)=>{
          var requestMade1=[];
          await user.requested.forEach(async (requestId)=>{
             
            await Request.findById( requestId).populate("providerId")
             .then((request)=>{
                console.log('enter request')
              //  console.log(request);

                requestMade1.push(request);
                console.log(requestMade1);
            })
             .catch((error)=>{
                console.log("error "+error);
             })
         }).then(()=>{console.log(requestMade1);
            res.render("profile/myRequest",{requested:requestMade1});})
            .catch((error)=>{
                console.log("error "+error);
             })
    })
    .catch((error)=>{
        console.log("error "+error);
    });
    
});



*/


module.exports=router;