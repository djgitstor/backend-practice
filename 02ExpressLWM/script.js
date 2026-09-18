const express = require("express");
const app = express();

// app.use(function(req,res,next){
// next();
// });
app.set("view engine","ejs");
app.use(express.static("./public"))



app.get('/',function(req,res){
    // throw Error("Something Went Wrong...")
    res.render("index",{age : 12});
});

app.get('/error',function(req,res,next){
    // throw new Error("Something Went Wrong...");
    // new Error("Something Went Wrong...");
    throw Error("Something Went Wrong...")
});

app.get('/Profile',function(req,res){
    res.send("Profile...");
})

app.get('/contact',function(req,res){
    res.render("contact");
})

app.get('/Profile/:username',function(req,res){
    const name = req.params.username;
    res.send(`Profile of  ${name}`);
})

app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
})

app.listen(3000)