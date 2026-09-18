figlet package to create bigg latters in console
express - express is a framework for nodejs
express use case => routing
routing => {
    "Disc":routing is to navigate different sublinks like "/profile" etc
    "main routs": {GET POST},
    "others routs": {PUT PATCH DELETE}
    }
nodemon = > {
    Disc : used to auto refresh server after every changes save,
    install : npm install nodemon -g // use -g to install nodemon globaly
    error : if system says script disabled then use npx like "npx nodemon filename.js"
}
midleware => {
    Disc : {
        exprlain:"midleware ek aisa function hai jo kisi bhi route se pehle chalta hai, matlab agar route chalne se pehle koi kaam karana ho to midleware ka upyog kiya ja sakta hai",

        jaise : ["route chalne se pehle console me kuch print karna" , "rout chalne se pehle rout hits ki value badhani"]

        dikkat1 : "midle chalne par request jam ho jaati thi midleware se aage nahi badhti thi",

        solution1 : "isse tackle karne ke liye hum next() function ko run karte hain jo hum function ke attribute ke sath pass karte hain",

        syntax : "app.use(function(req,res,next){
                    console.log('Code');
                    next();
                    })"

        Quistion1 : kitne midleware bana sakte hain ,
        ans :  'kitne bhi ! ["agar multiple midlewares hain to next() function se hum rout ki jagah agle midleware par jayenge" ]'
    } 
}

1:44 video timestamp -- Finished
-------------------------------------------------------------------------------------------------------
---- Express.js - Learn What Matters: Mastering the Framework | Backend (Node JS) Series ---
https://www.youtube.com/watch?v=pKJ4GGyDgJo&list=PL92rin1bGHEyqnAWgmIZmL0DmIxWq249F



req,res
req me request ka sara data hota hai jo userki taraf se aayi hai
res me data nahi sara code hota hai server se bhejne ke liye

--- Dynamic Routing (Express.js) ---

Dynamic routing tab use hoti hai jab URL ka ek hissa static (fixed) rehta hai aur dusra hissa dynamically change hota rehta hai (jaise alag-alag users, products ya IDs ke liye).

Har naye user ke liye alag route likhne ke bajaye (jaise /profile/rahul, /profile/amit), hum URL ke badalne wale part ko ek variable bana dete hain.

Core Concept: Route Parameters (:)
URL path me kisi bhi segment ke aage colon (:) lagane se Express use dynamic parameter maan leta hai:

Static Route: /profile/user1 (Sirf user1 ke liye chalega)

Dynamic Route: /profile/:username (URL me username ki jagah jo bhi aayega, use (req.params.username) me capture kar lega)

Browser se jo bhi request jayegi vo req me jayegi or :username ko ( req.params.username ) se access kar sakte hain

-- Templete engine --
Disc => 

-- ejs --
html me calculation nahi ho sakti lekin ejs html jaisa hi hai bas iske calculation kar sakta hai

Templete engines => pug,handlebars, ejs, jade

ejs setup steps:- we'll use ejs  because it looks like html

    1. ejs install
        npm i ejs
    2. configure ejs
        app.set("view engine","ejs")
    3. ek views naam se folder banao
    4. usme .ejs files banao (is file me Normal Html hi hoga)
    5. send ki jagah render karo => render karte time views folder ke andar wali kisi file ka naa hi likhna hai or usme .ejs attact nahi karta

Static Files :-
    Images , Stylesheets , FrontEnd JavaScript Setup karna...
Static files ko setup karne ke liye Do These Things :-
    1. Create a folder called public
    2. Create 3 folders inside public folder > images , Stylesheets , javascripts
    3. configure the Express static in script.js file
        app.use(express.static("./public"))
    4. Understand The path
        path se /public name hatta dena hai yeh apne aap add ho jaata haiS

-- Error Handling --
need to learn little bit


---   Video Finished    ---
------------------------------------------------------------------------------------------------------------------------
https://www.youtube.com/watch?v=ZpszSj3ziQk

Setup Tasks.
express js
install express
express js boilerplate code
    go to npm
    search express
    copy the code
express js ejs setup
    install ejs
    set view engine
    create views folder
    create ejs files
    render ejs files inside route

express static files setup
    app.use(express.static('/public'))

    archetecture of public folder
        rool ke andar public or public ke andar stylesheets, images, javascripts naam ke folder banane jinme static files hongi
        href me "/public/images/img.jpg" ki jagah seedha "/images/img.jpg" hi likha jayega

----- Vedeo timestamp 13:52 ---- Next Session Start
// hum logo ko kaafi saara kaam karna padta hai express setup krne mein iska matlab har baar jab hum naya project banaayege to har baar fir se utna hi kaam krna padega, matlab ki poora code likho and sab kuchh setup karo, is time ko bacha sakte ho with help of express generator, use express generator and it will make the folder structure for you and it will also write the basic code for the 

//Express generator ek folder bana kar deta hai, jiska matlab hame khud folder nahi banana . or express gen... sari files ko is folder me daal kar dega
    // steps to use express generator
        // sabse pahle jeevan mein ek baar laptop par install karo globally
        // npm i express-generator -g

        // to create new app anywhere:
        // open cmd move to desktop
        // create new app :
        // express appname --view=ejs

        // now use two commands
        // cd appname
        // npm i
        //open in viewscode 

VideoTimeStamp -- 28:34 -- ConfusionStart
    Changes
        app.get -> router.get
        npx nodemon filename -> npx nodemon
        sample app = lolopopo folder

---MongoDB--- Video TimeStamp = 37:00
    there are 2 types of databases Relational and Non-Relational
    mongodb = Non-Relational --
        / modal         => collection
        / schema (code) => documents (db)

        // ek app ka poora data => db
        // ek app mein variety of data hota hai par poora data hota app ka hi hai, par us data ka sub category kehlaata hai collection
        // collection matlab ki bola users ka data, ek user pe baat kri to hua document

    -- install mongodb --
    -- install mongoosejs --
        npm i mongoose

    -- require and setup connection --
        const mongoose = require("mongoose");
        mongoose.connect("mongodb://127.0.0.1:27017/dbname") // it creates DB

    -- make schema --
        //schema matlab apko ye batana ki banne waala har document me kya kya hoga.
        // fileName => user.js

        const userschema = mongoose.Schema({
                                username: String,
                                name: String,
                                age: Number
                            })

    -- create model and export -- 
        module.exports = mongoose.model("collectionNaam",userschema); // it creates collection 

        --- VideoTimeStamp = 58:00 ---

       //in index.js write
        const userModel = require("./users")


----  Session and cookie  ---- 01:17:30

client-> cookie
server-> session

--- session ---

1. install express-session
    npm i express-session
    var session = require("express-session");

    ---- CreateSession ---- in a midleware in app.js

    app.use(session({
        resave:false,               // agar value change nahi hui to save nahi hoga
        saveUninitialized:false,    // koi aisi value jo humne initialize nahi ki vo save nahi hogi
        secret:"hobolaholabola"     // isme kuch bhi bhej sakte hain jaise koi encryption key
    }));

    --- Set Session ---

    router.get("/", function(req,res){
        req.session.anyname = "value";  //kisi bhi rout me is line se session me value set ho jaati hai
        res.render("index")
    })

    --- Check Session ---

    router.get("/checkSession",function(req,res){
        console.log(req.session); // kisi bhi route se session check kar sakte hain
        res.send("check the console...")
    })

    --- Destroy Session ---

    router.get("/removeSession",function(req,res){
        req.session.destroy(function(err){
         if (err) throw err;
         res.send("session Destroyed...")
        })
    })

--- Cookie ---
npm i cookie-parser // already installed by express-generator
var cookieParser = require("cookie-parser")
--- setup ---
app.use(cookieParser())

    router.get("/cookieSet", function(req,res){
        res.cookie('cookieName','value'); // set cookie in client side
        res.render("index")
    })

    router.get("/cookieRead",function(req,res){
        let userCookie = req.cookies; // read cookie from client side
        res.send(userCookie);
    })

    router.get("/deleteCookie",function(req,res){
        res.clearCookie("cookieName")
        res.send("Cookie Deleted...")
    })

---- VideoEnd ----