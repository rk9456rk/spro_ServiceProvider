var middleWareObj={};
var Review= require('../models/Review');
var ServiceProvider=require('../models/serviceProvider');
middleWareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated())
    {
       return next();
    }
    console.log("enter flash");
    req.flash("error","Please login in");
    res.redirect("/login")
   };

middleWareObj.checkReviewCreater=function(req,res,next){
      
    Review.findById(req.params.reviewId).then((review)=>{
      if(review.author.id.equals(req.user._id))
     { next();}
     else{
      req.flash("error","You are not Authorize to do this Action");
           res.redirect("back");
     }
    }).catch((error)=>{console.log("error... "+error);
                  req.flash("error","error... "+error);
                   res.redirect("back");    
                  });
};
middleWareObj.checkCreator=function(req,res,next){
      
    ServiceProvider.findById(req.params.id).then((serviceProvider)=>{
      if(serviceProvider._id.equals(req.user._id))
     { next();}
     else{
      req.flash("error","You are not Authorize to make this Change");
           res.redirect("back");
     }
    }).catch((error)=>{console.log("error... "+error);
    req.flash("error","error... "+error);
                   res.redirect("back");    
                  });
}
middleWareObj.checkAuthorForArticle=function(req,res,next){
     
      BusinessArticle.findById(req.params.id).then((article)=>{
        if(article.author.id.equals(req.user._id))
       { next();}
       else{
            
      req.flash("error","You are not Authorize to do this Action");
             res.redirect("back");
       }
      }).catch((error)=>{console.log("error... "+error);
      req.flash("error","error... "+error);
                     res.redirect("back");    
                    });
    }
middleWareObj.checkIsProvider=function(req,res,next){
     if(req.user.usertype==="serviceProvider")
     {
        next();
     }
     else
     {
          res.redirect("back");
     }
    }
module.exports=middleWareObj;