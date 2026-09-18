import express from 'express';
const app = express();
app.use(function(req,res,next){
    console.log("hello this is midleware 1")
    next();
})
app.use(function(req,res,next){
    console.log("hello this is midleware 2")
    next();
})
app.get("/",function(req,res){
    res.send("HelloWorld")

})
app.get('/profile',function(req,res){
    res.send("Hello from profile...")
})
app.listen(3000)