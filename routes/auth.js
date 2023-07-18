var express=require('express');
var router= express.Router();
var passport=require('passport');
var User=require("../models/user");
var Customer=require("../models/customer");
var ServiceProvider=require("../models/serviceProvider");
var middleWare=require('../middleware/index');
//=======================================================
/************ user authentication **********************/
//======================================================

// register

router.get("/register",(req,res)=>{
    res.render("Authentication/signUp");
  
  });

router.post("/register",(req,res)=>{
    var SchemaUsed;
    if(req.body.userType==="customer")
    SchemaUsed=Customer;
    else
    if(req.body.userType==="serviceProvider")
    SchemaUsed=ServiceProvider;
    else
    SchemaUsed=User;

    var user=new SchemaUsed({username:req.body.username, 
                           usertype:req.body.userType,
                          userStatus:"hidden",
                          userPower:"customer"});
      SchemaUsed.register( user,req.body.password)
      .then((user)=>{//console.log(user);
           
          passport.authenticate("local")(req,res,()=>{
              console.log(" entered 11");
              req.flash("success","Welcome to Service Portal"+user.username);
              res.redirect("/");
          });
         // res.redirect("/");
       })
      .catch((error)=>{console.log(error);
      req.flash("error","Something Went Wrong "+error.message);
                    res.render("Authentication/signUp")});
  
    
  });
  // login
router.get("/login",(req,res)=>{
      
      res.render("Authentication/login");
  });
router.post("/login",
  passport.authenticate("local",{
      successRedirect:"/",
      failureRedirect:"/login"
  }
  ),(req,res)=>{});
  // log out
router.get("/logout",(req,res)=>{
    
   req.logout((error)=>{
      if(error){ console.log("error"+error)}

      req.flash("error","Logged you Out!");
      res.redirect("/");
  });
  
  });
router.get("/profile",middleWare.isLoggedIn,(req,res)=>{
 res.render("profile/mainPage");
});
  // cheak is user is logged in


module.exports=router;