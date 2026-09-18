var express = require('express');
var router = express.Router();
const userModal = require("./users");



/* GET home page. */
router.get('/', function (req, res, next) {
  req.session.ban = true; // session me value set karne ke liye
  res.render('index', { title: 'Express' });
});

router.get("/checkSession", function (req, res) {
  console.log(req.session); // kisi bhi route se session check kar sakte hain
  res.send("check the console...")
})

router.get("/user1", function (req, res) {
  if (req.session.ban == true) {
    return res.send("You are banned...");
  } else {
    return res.send("You are not banned...");
  }

})



router.get("/removeSession", function (req, res) {
  req.session.destroy(function (err) { // it wants a callback function to destroy session
    if (err) throw err;
    res.send("session Destroyed...")
  })
})



router.get("/create", async function (req, res) {
  const createdUser = await userModal.create({
    username: "harsh",
    name: "sarthak",
    age: 20
  })
  res.send(createdUser)
})

// router.get("/create/:username", async function(req,res){
//   let allusers = await userModal.findOne({username:`${req.params.username}`})
//   if(allusers == null){
//     const createdUser = await userModal.create({
//       username:req.params.username,
//       name:"sarthak",
//       age:20
//     })
//     return res.send(createdUser)
//   }else{
//     return res.send("user already exists..")
//   }
// })

router.get("/find", async function (req, res) {
  let allusers = await userModal.findOne({ username: "harsh" })
  // let allusers = await userModal.find()
  res.send(allusers);
  console.log(allusers)
})
router.get("/delete", async function (req, res) {
  let deletedUser = await userModal.findOneAndDelete({
    username: "harsh"
  });
  res.send(deletedUser)
})




router.get('/cookieSet', function (req, res) {
  res.cookie('cookieId', '89898989');
  res.send('cookie Set')
})

router.get("/cookieRead", function (req, res) {
  console.log(req.cookies); // read cookie from client side
  res.send(req.cookies);
})

router.get("/deleteCookie", function(req,res){
  res.clearCookie("cookieId");
  res.send("cookieDeleted")
})

module.exports = router;
