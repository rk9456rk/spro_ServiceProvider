var express=require('express');
const bodyParser=require("body-parser");
const request =require('request');
const mongoose =require('mongoose');
const methodOveride=require('method-override');
var expressSanitizer=require('express-sanitizer');
var LocalStrategy=require('passport-local');
var passport=require('passport');
var app=express();
var flash=require('connect-flash');

app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOveride("_method"));
app.use(expressSanitizer());
app.use(flash());

// Schema SetUp
var ServiceProvider= require("./models/serviceProvider");
var BusinessArticle=require("./models/businessArticle");
var Review= require("./models/Review");
var User=require('./models/user');
//=================ROUTES==========================/
var indexRoutes=require("./routes/index");
var businessArticleRoutes=require("./routes/businessArticle");
var authRoutes=require('./routes/auth');
var reviewRoutes=require('./routes/reviews');
var serviceProviderRoutes = require('./routes/serviceProvider');
var requestRoutes=require('./routes/request');
var profileRoutes=require('./routes/profile');
var SensitiveData=require('./SensitiveData/importantData');
//const seedDB = require('./seed');

// express -session
//======================

app.use(require("express-session")(
    { secret:SensitiveData.secret,
      resave:false,
      saveUninitialized:false
    }
));
app.set("view engine","ejs"); 
//=========================================================
//=============================== PASSPORT...==============
//=========================================================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
   // console.log("......");
   // console.log(req.user);
   
    next();
   });
mongoose.connect(SensitiveData.mongoDbUrl
).then(()=>{
    console.log(' sucessfully connect to MongoDb');
   // seedDB();
}).catch((error)=>{
console.log('unable to connect to MongoDb');
console.error(error);
});
// index routes
app.use(indexRoutes);
//for serviceProvider
app.use(serviceProviderRoutes);
// for review
app.use(reviewRoutes);
//*************operation perform by Admin */
//=======================================================
/************ user authentication **********************/
//======================================================
app.use(authRoutes);
//===============================
//BusinessArticle*************
//===============================
app.use(businessArticleRoutes);
//======================
//Request**************
//=========================
app.use("/request",requestRoutes);
//========================
//Profile***********
///////////////////
app.use(profileRoutes);

app.listen(process.env.PORT||3000,process.env.IP,()=>{
    console.log('service Portal started app')
});