var express=require('express');
var router=express.Router();


router.get("/",function(req,res){
    console.log(req.user);
    res.render("landing");
});
router.get("/getStart",(req,res)=>{
    if(req.isAuthenticated())
    {   
        console.log(req.isAuthenticated());
        res.redirect("/serviceProvider");
    }
    res.redirect("/register");
});

module.exports=router;