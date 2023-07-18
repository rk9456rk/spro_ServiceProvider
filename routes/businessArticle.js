var express=require('express');
var router=express.Router();
var BusinessArticle=require('../models/businessArticle');
var middleWare=require('../middleware/index');
//===================================================================
/**** BUSINESS ARTICLE*********************************************/
//===================================================================
router.get("/businessArticle",(req,res)=>{
    BusinessArticle.find().then((articles)=>{
      
        res.render("businessArticle/mainBusinessArticle",{articles:articles});
    }).catch((error)=>{
        console.log("error"+error);
    })
   
});
// new route
router.get("/businessArticle/new",middleWare.isLoggedIn,(req,res)=>{
    res.render("businessArticle/new");
});
// create new article
router.post("/businessArticle/new",middleWare.isLoggedIn,(req,res)=>{
    req.body.article.body=req.sanitize(req.body.article.body);
    var author={id:req.user._id,
                username:req.user.username};
    var newArticle={
                      title:req.body.article.title,
                      image:req.body.article.image,
                      body: req.body.article.body,
                      author:author
                   };
    BusinessArticle.create(newArticle)
    .then((article)=>{res.redirect("/businessArticle/show/"+ article._id)})
    .catch((error)=>{
        console.log("error: "+error);
        res.render("businessArticle/new") 
    })
});
// show for each article page
router.get("/businessArticle/show/:id",middleWare.isLoggedIn,(req,res)=>{
    BusinessArticle.findById(req.params.id).
    then((article)=>{
     res.render("businessArticle/show",{article:article});
    }).catch((error)=>{
        console.log("enter show get ..."+error);
        res.redirect("/businessArticle");
    });
 
});
// edit page for article
router.get("/businessArticle/edit/:id",middleWare.isLoggedIn,middleWare.checkAuthorForArticle,(req,res)=>{
    BusinessArticle.findById(req.params.id).then((article)=>
    {
    
    res.render("businessArticle/edit",{article:article})}).
    catch((error)=>{
        console.log("enter edit get ..."+error);
        res.redirect("/businessArticle");
    });
});
// update post for article
router.put("/businessArticle/edit/:id",middleWare.isLoggedIn,middleWare.checkAuthorForArticle,(req,res)=>{
    req.body.article.body=req.sanitize(req.body.article.body);
BusinessArticle.findByIdAndUpdate(req.params.id,req.body.article).
then(()=>{
     console.log("sucess full edited");
     res.redirect("/businessArticle/show/"+req.params.id);})
.catch((error)=>{ 
    console.log("enter edit put ..."+error);
     res.redirect("/businessArticle");})
});
//delete Route
router.delete("/businessArticle/delete/:id",middleWare.isLoggedIn,middleWare.checkAuthorForArticle,(req,res)=>{
    BusinessArticle.findByIdAndRemove(req.params.id).
    then(()=>{res.redirect("/businessArticle");})
    .catch((error)=>{
        console.log("not delete error "+error);
         res.redirect("/businessArticle");
        });
});


module.exports=router;