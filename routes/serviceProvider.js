var express=require('express');
var router=express.Router();
var ServiceProvider=require('../models/serviceProvider');
var middleWare=require('../middleware/index');

router.get("/serviceProvider",function(req,res){
    
    ServiceProvider.find().then((providers)=>{
        res.render("serviceProvider/mainServiceProvider",
        {serviceProviders:providers});  
    }).catch((error)=>{
          console.log("error");
          req.flash("error","error... "+error);
          redirect("back");
    });
          
});
// show the serviceProvider with this id
router.get("/serviceProvider/:id",middleWare.isLoggedIn,(req,res)=>{

    ServiceProvider.findById(req.params.id).populate("reviews")
    .then((serviceProvider)=>{
        res.render("serviceProvider/show",{serviceProvider:serviceProvider});
    }).catch((error)=>{
      console.log("error .. "+error);
      req.flash("error","error... "+error);
       res.redirect("back");
    });
   
});
// show the edit page
router.get("/serviceProvider/:id/edit",middleWare.isLoggedIn,
              middleWare.checkCreator,(req,res)=>{
  
  ServiceProvider.findById(req.params.id).then((serviceProvider)=>{
   
   res.render("serviceProvider/edit",{serviceProvider:serviceProvider});
    
  }).catch((error)=>{console.log("error... "+error);
                  req.flash("error","error... "+error);
                 res.redirect("/serviceProvider");    
                });

});

// update the serviceProvider
router.put("/serviceProvider/:id",middleWare.isLoggedIn,
                  middleWare.checkCreator,(req,res)=>{
    ServiceProvider.findByIdAndUpdate(req.params.id,req.body.serviceProvider)
    .then((serviceProvider)=>{
       req.flash("success","profile edited sucessfully")
       res.redirect("/serviceProvider/"+req.params.id);
    }).catch((error)=>{
      req.flash("error","error... "+error);
       res.redirect("/serviceProvider/"+req.params.id);
   });
});

// create new service provider
/*
router.post("/createServiceProvider",isLoggedIn,(req,res)=>{
  var name=req.body.name;
  var profilePhoto=req.body.profilePhoto;
  var contactNumber=req.body.contactNumber;
  var serviceType=req.body.serviceType;
  var description=req.body.description;
  var author={id:req.user._id,
              username:req.user.username};
  var newServiceProvider={name:name,profilePhoto:profilePhoto,
                          description:description,
                          contactNumber:contactNumber,serviceType:serviceType,
                        author:author};
  ServiceProvider.create(
    newServiceProvider)
 .then(()=>{console.log("created")})
 .catch((error)=>{console.log("error"+error)});
  res.redirect("/");
});
router.get("/serviceProvider/:id/delete",(req,res)=>{
  res.render("serviceProvider/delete",{id:req.params.id});
});*/
// delete 
router.delete("/serviceProvider/:id",
               middleWare.isLoggedIn,middleWare.checkCreator,(req,res)=>{
  ServiceProvider.findByIdAndRemove(req.params.id)
  .then(()=>{
      res.redirect("/serviceProvider");
  })
  .catch((error)=>{
    console.log("error "+error);
    res.redirect("/serviceProvider/"+req.params.id);
  })
});
// page shows for creating new service provider
router.get("/new/serviceProvider",(req,res)=>{
    res.render("serviceProvider/new");
});



module.exports=router;