
// Express framework module ko import kar rahe hain
var express = require('express');

// Express se ek router instance create kar rahe hain alag-alag routes handle karne ke liye
var router = express.Router();

// Users database model ko './users' file se import kar rahe hain taaki MongoDB operations perform ho sakein
const userModal = require("./users");



/* GET home page. */
// Home page ('/') ke liye GET route define kar rahe hain
router.get('/', function (req, res, next) {
  // Server-side session me 'ban' key ki value 'true' set kar rahe hain
  req.session.ban = true; // session me value set karne ke liye

  // 'views' folder me se 'index' template ko render kar rahe hain aur usme title variable pass kar rahe hain
  res.render('index', { title: 'Express' });
});

// '/checkSession' route define kar rahe hain active session data inspect karne ke liye
router.get("/checkSession", function (req, res) {
  // Current request ke session ka pura data terminal/console par print kar rahe hain
  console.log(req.session); // kisi bhi route se session check kar sakte hain

  // Browser/client ko confirmation text response send kar rahe hain
  res.send("check the console...")
})

// '/user1' route par user ka ban status check karne ke liye logic
router.get("/user1", function (req, res) {
  // Condition check kar rahe hain ki session me 'ban' ki value true hai ya nahi
  if (req.session.ban == true) {
    // Agar banned hai toh aage ka execution rok kar 'You are banned...' response bhej rahe hain
    return res.send("You are banned...");
  } else {
    // Agar ban nahi hai toh access allow karke message bhej rahe hain
    return res.send("You are not banned...");
  }
})



// '/removeSession' route par server se active session destroy/delete kar rahe hain
router.get("/removeSession", function (req, res) {
  // Current user ke session ko memory/store se completely destroy kar rahe hain
  req.session.destroy(function (err) { // it wants a callback function to destroy session
    // Agar session destroy karte waqt koi error aaye toh application me exception throw karega
    if (err) throw err;

    // Session successfully delete hone ke baad browser ko confirmation message send kar rahe hain
    res.send("session Destroyed...")
  })
})



// '/create' route par database me naya user insert kar rahe hain (async function use kiya hai)
router.get("/create", async function (req, res) {
  // userModal ki madad se MongoDB me ek naya document create karke database se response aane ka wait kar rahe hain
  const createdUser = await userModal.create({
    username: "harsh", // User ka username set kar rahe hain
    name: "sarthak",   // User ka display name set kar rahe hain
    age: 20            // User ki age set kar rahe hain
  })

  // Newly created user object ko JSON response ke roop me client ko bhej rahe hain
  res.send(createdUser)
})

// router.get("/create/:username", async function(req,res){
//   // Database me check kar rahe hain ki URL parameter se aya username pehle se exist karta hai ya nahi
//   let allusers = await userModal.findOne({username:`${req.params.username}`})
//   // Agar user database me nahi mila (value null hai) toh create logic chalega
//   if(allusers == null){
//     // Naya user create kar rahe hain URL params ke username ke sath
//     const createdUser = await userModal.create({
//       username:req.params.username,
//       name:"sarthak",
//       age:20
//     })
//     // Created user ka data response me return kar rahe hain
//     return res.send(createdUser)
//   }else{
//     // Agar user pehle se exist karta hai toh warning message return kar rahe hain
//     return res.send("user already exists..")
//   }
// })

// '/find' route par database me se record search karne ka logic
router.get("/find", async function (req, res) {
  // MongoDB me se username "harsh" ka pehla matching document search karke fetch kar rahe hain
  let allusers = await userModal.findOne({ username: "harsh" })

  // // Agar saare users ka array fetch karna ho toh is syntax ka use kar sakte hain
  // let allusers = await userModal.find()

  // Mil chuka user document browser ko response me bhej rahe hain
  res.send(allusers);

  // Wahi fetched data server ke terminal/console par bhi log kar rahe hain
  console.log(allusers)
})

// '/delete' route par specific user ko database se remove karne ka logic
router.get("/delete", async function (req, res) {
  // MongoDB me "harsh" username wale document ko search karke directly delete kar rahe hain
  let deletedUser = await userModal.findOneAndDelete({
    username: "harsh" // Query condition specify ki hai
  });

  // Jo user delete hua hai uska object confirmation ke liye client ko send kar rahe hain
  res.send(deletedUser)
})




// '/cookieSet' route par client ke browser me cookie store kar rahe hain
router.get('/cookieSet', function (req, res) {
  // Browser ke andar 'cookieId' key aur '89898989' value ke sath cookie set kar rahe hain
  res.cookie('cookieId', '89898989');

  // Client ko success message bhej rahe hain
  res.send('cookie Set')
})

// '/cookieRead' route par browser se aayi hui cookies ko read kar rahe hain
router.get("/cookieRead", function (req, res) {
  // Request ke headers me se cookie-parser dwara parse ki gayi cookies console me print kar rahe hain
  console.log(req.cookies); // read cookie from client side

  // Browser ko uski saari saved cookies ka object return kar rahe hain
  res.send(req.cookies);
})

// '/deleteCookie' route par client ke browser se cookie delete karne ka logic
router.get("/deleteCookie", function(req,res){
  // Browser me saved 'cookieId' naam ki cookie ko expire/clear kar rahe hain
  res.clearCookie("cookieId");

  // Client ko cookie delete hone ka confirmation message bhej rahe hain
  res.send("cookieDeleted")
})

// Is router file ko export kar rahe hain taaki main app file (jaise app.js) me ise require karke mount kiya ja sake
module.exports = router;