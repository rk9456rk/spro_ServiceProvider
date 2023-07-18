var express=require('express');
var router=express.Router();
var ServiceProvider=require('../models/serviceProvider');
var Review=require('../models/Review');
var middleWare=require('../middleware/index');

//   form for creating new comments
router.get("/serviceProvider/:id/review/new",middleWare.isLoggedIn,(req,res)=>{
    ServiceProvider.findById(req.params.id).
    then((serviceProvider)=>{
        
        res.render("review/new",{serviceProvider:serviceProvider});})
    .catch((error)=>{
        console.log("error .. "+error);
        req.flash("error","error... "+error);
        res.redirect("back");
      });
 
});
// create review to database using put route
router.post("/serviceProvider/:id/review", middleWare.isLoggedIn,(req,res)=>{
 ServiceProvider.findById(req.params.id).
 then((serviceProvider)=>{
  
   Review.create(req.body.review).then((review)=>{

     review.author.id=req.user._id;
     review.author.username=req.user.username;
     review.save();
     serviceProvider.reviews.push(review);
    serviceProvider.save().then(()=>{
      req.flash("success","your review is added successfully.... Thanks for your review");
      
     }).catch((error)=>{console.log("error "+error)});
         
          res.redirect("/serviceProvider/"+serviceProvider._id);
   }).catch((error)=>{console.log("error .. "+error);});
  
 })
 .catch((error)=>{
    console.log("error .. "+error);
    req.flash("error","error... "+error);
    res.redirect("/serviceProvider");
  });
});
// edit review page
router.get("/serviceProvider/:id/review/:reviewId/edit",
middleWare.isLoggedIn,middleWare.checkReviewCreater,(req,res)=>{
  Review.findById(req.params.reviewId)
  .then((review)=> {
    res.render("review/edit",{providerId:req.params.id,review:review});
    }).catch((error)=>{
           console.log("error"+error);
           req.flash("error","error... "+error);
           res.redirect("back");
    });
 
});
//update review
router.put("/serviceProvider/:id/review/:reviewId",
    middleWare.isLoggedIn,middleWare.checkReviewCreater,(req,res)=>{

  Review.findByIdAndUpdate(req.params.reviewId,req.body.review)
  .then(()=>{ 
    req.flash("success","your review is edited successfully");
    res.redirect("/serviceProvider/"+req.params.id);
  }).catch((error)=>{
    console.log("error"+error);
    req.flash("error","error... "+error);
    res.redirect("back");  
  });
});
// delete route page
router.get("/serviceProvider/:id/review/:reviewId/delete",
        middleWare.isLoggedIn,middleWare.checkReviewCreater,(req,res)=>{
  res.render("review/delete",{providerId:req.params.id,reviewId:req.params.reviewId});
});
//delete route
router.delete("/serviceProvider/:id/review/:reviewId",
              middleWare.isLoggedIn,middleWare.checkReviewCreater,(req,res)=>{
  Review.findByIdAndRemove(req.params.reviewId)
  .then(()=>{ res.redirect("/serviceProvider/"+req.params.id);})
  .catch((error)=>{
    console.log("error"+error);
    req.flash("error","error... "+error);
    res.redirect("back");
  })
});
 // cheak is user is logged in

module.exports=router;