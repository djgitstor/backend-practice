/**
 * ==============================================================================
 *                EXPRESS.JS & BACKEND COMPLETE REVISED NOTES
 * ==============================================================================
 * यह फ़ाइल VS Code में साफ़ दिखने के लिए JS फ़ॉर्मेट में तैयार की गई है।
 * थ्योरी और कॉन्सेप्ट्स कमेंट्स (Comments) में हैं और सिंटैक्स कोड (Code) फ़ॉर्मेट में है।
 */


// ==============================================================================
// 1. MODULE SYSTEMS: REQUIRE (CommonJS) VS IMPORT (ES Modules)
// ==============================================================================

/**
 * [Node.js में पैकेज इम्पोर्ट करने के दो तरीके होते हैं]
 * 
 * 1. CommonJS (CJS) - `require()`:
 *    - Node.js का डिफ़ॉल्ट मॉड्यूल सिस्टम।
 *    - सिंटैक्स: const express = require("express");
 *    - एक्सपोर्ट: module.exports = router;
 * 
 * 2. ES Modules (ESM) - `import / export`:
 *    - मॉडर्न JavaScript (ES6) का तरीका।
 *    - इसे Node.js में इस्तेमाल करने के लिए package.json में यह लाइन जोड़नी पड़ती है:
 *      {
 *        "type": "module"
 *      }
 *    - सिंटैक्स: import express from "express";
 *    - एक्सपोर्ट: export default router;
 * 
 * [गोल्डन रूल (Consistency Rule)]:
 * - एक फ़ाइल या प्रोजेक्ट के अंदर किसी एक ही मॉड्यूल सिस्टम का पालन करना चाहिए।
 * - अगर आपने पहला पैकेज `require()` से लोड किया है, तो बाकी सारे पैकेज भी `require()` 
 *   से ही लोड होंगे।
 * - अगर आपने `import` का इस्तेमाल किया है, तो सभी पैकेज `import` से ही आएंगे। 
 * - दोनों को एक ही फ़ाइल में आपस में मिक्स (mix-match) नहीं किया जाता।
 */


// ==============================================================================
// 2. COMPLETE EXPRESS BOILERPLATE (रेडी-टू-यूज़ कोड)
// ==============================================================================

/**
 * [स्टेप-बाय-स्टेप नया प्रोजेक्ट सेटअप]:
 * 1. टर्मिनल में फ़ोल्डर बनाएं और जाएं: mkdir myapp && cd myapp
 * 2. पैकेज इनिशियलाइज़ करें: npm init -y
 * 3. एक्सप्रेस इंस्टॉल करें: npm i express
 * 4. app.js फ़ाइल बनाएं और नीचे दिया गया बॉयलरप्लेट कोड लिखें।
 */

// --- तरीका A: CommonJS स्टाइल (डिफ़ॉल्ट और सबसे ज़्यादा इस्तेमाल होने वाला) ---
const express = require("express");
const app = express();
const PORT = 3000;

// Body Parsers (Form Data और JSON Data पढ़ने के लिए अनिवार्य)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// बेसिक होम राउट
app.get("/", (req, res) => {
  res.send("Server is running perfectly!");
});

// सर्वर लिसन (Server Listen)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


/*
// --- तरीका B: ES Module स्टाइल (अगर package.json में "type": "module" सेट हो) ---
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running with ES Modules!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
*/


// ==============================================================================
// 3. TOOLS & PACKAGES
// ==============================================================================

/**
 * [Figlet Package]
 * Console में बड़े और स्टाइलिश लेटर्स (ASCII Art) प्रिंट करने के लिए इस्तेमाल होता है।
 * Install: npm i figlet
 */
const figlet = require("figlet");

figlet("Express JS", function (err, data) {
  if (err) return;
  // console.log(data);
});

/**
 * [Nodemon]
 * सर्वर कोड में कोई भी बदलाव सेव होते ही सर्वर को अपने आप रीस्टार्ट कर देता है।
 * 
 * Installation:
 * - Global: npm install nodemon -g
 * - Dev Dependency (Recommended): npm install nodemon --save-dev
 * 
 * Run Commands:
 * - npx nodemon filename.js
 * - अगर package.json की scripts में "dev": "nodemon app.js" डाला है: npm run dev
 * 
 * Windows PowerShell Error ("running scripts is disabled on this system"):
 * - समाधान: npx nodemon app.js का उपयोग करें।
 */


// ==============================================================================
// 4. ROUTING & HTTP METHODS
// ==============================================================================

/**
 * [Routing क्या है?]
 * राउटिंग यह तय करती है कि क्लाइंट के किसी खास URL (Endpoint) और HTTP Method
 * (GET, POST, PUT, PATCH, DELETE) पर सर्वर क्या रिस्पॉन्स देगा।
 * 
 * Methods:
 * - GET: सर्वर से डेटा प्राप्त करने के लिए।
 * - POST: सर्वर पर नया डेटा भेजने/क्रिएट करने के लिए।
 * - PUT: पूरे डेटा को अपडेट या रिप्लेस करने के लिए।
 * - PATCH: डेटा के किसी खास हिस्से को अपडेट करने के लिए।
 * - DELETE: डेटा को डिलीट करने के लिए।
 * 
 * [req और res का अंतर]
 * - req (Request): इसमें क्लाइंट की तरफ से आने वाला सारा डेटा होता है 
 *   (req.params, req.query, req.body, req.headers, req.cookies)।
 * - res (Response): इसमें सर्वर से क्लाइंट को रिस्पॉन्स भेजने के मेथड्स होते हैं 
 *   (res.send(), res.json(), res.render(), res.redirect(), res.status())।
 */

app.get("/about", (req, res) => {
  res.send("About Page");
});


// ==============================================================================
// 5. MIDDLEWARE
// ==============================================================================

/**
 * [Middleware क्या है?]
 * मिडलवेयर एक ऐसा फ़ंक्शन है जो क्लाइंट की रिक्वेस्ट आने और राउट हैंडलर के चलने के
 * बीच में execute होता है।
 * 
 * Use Cases:
 * - लॉगिंग (हर रिक्वेस्ट का टाइम और URL प्रिंट करना)
 * - ऑथेंटिकेशन और टोकन वेरिफिकेशन
 * - रिक्वेस्ट डेटा को प्रोसेस या वैलिडेट करना
 * 
 * मुख्य नियम:
 * 1. next() फ़ंक्शन: अगर मिडलवेयर में res.send() नहीं किया गया है, तो अगले
 *    मिडलवेयर या राउट पर जाने के लिए next() कॉल करना अनिवार्य है; नहीं तो
 *    रिक्वेस्ट बीच में ही अटक (jam) जाएगी।
 * 2. हम कितने भी मिडलवेयर बना सकते हैं; ये क्रमबद्ध (order wise) चलते हैं।
 */

// Custom Application-level Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request made to: ${req.url}`);
  next(); // अगले चरण पर भेजता है
});


// ==============================================================================
// 6. DYNAMIC ROUTING & ROUTE PARAMETERS
// ==============================================================================

/**
 * [Dynamic Routing]
 * जब URL का एक हिस्सा स्थिर (static) रहता है और दूसरा हिस्सा बदलता रहता है
 * (जैसे यूज़रनेम, प्रोडक्ट आईडी), तब डायनामिक राउटिंग का उपयोग होता है।
 * 
 * सिंटैक्स:
 * URL सेगमेंट के आगे कोलन (:) लगाने से वह पैरामीटर बन जाता है।
 * इसे एक्सेस करने का तरीका: req.params.<paramName>
 */

// Single Dynamic Parameter: /profile/sahil, /profile/amit
app.get("/profile/:username", (req, res) => {
  const username = req.params.username;
  res.send(`Welcome to the profile of: ${username}`);
});

// Multiple Dynamic Parameters: /post/:category/:postId
app.get("/post/:category/:postId", (req, res) => {
  const { category, postId } = req.params;
  res.send(`Category: ${category} | Post ID: ${postId}`);
});


// ==============================================================================
// 7. TEMPLATE ENGINE (EJS)
// ==============================================================================

/**
 * [Template Engine क्या है?]
 * नॉर्मल HTML में डायनामिक डेटा, लूप या कैलकुलेशन नहीं की जा सकती।
 * टेम्पलेट इंजन (जैसे EJS, Pug, Handlebars) हमें सर्वर-साइड डेटा को HTML में
 * आसानी से रेंडर करने की सुविधा देते हैं।
 * 
 * EJS Setup Steps:
 * 1. npm i ejs
 * 2. app.set("view engine", "ejs");
 * 3. प्रोजेक्ट रूट में 'views' नाम का फ़ोल्डर बनाएं।
 * 4. views फ़ोल्डर के अंदर '.ejs' फ़ाइलें बनाएं (जैसे index.ejs)।
 * 5. res.send() की जगह res.render("filename") का उपयोग करें (एक्सटेंशन .ejs लिखने की ज़रूरत नहीं)।
 * 
 * EJS Tags Syntax:
 * - <%= variable %> : डेटा या वेरिएबल की वैल्यू प्रिंट करने के लिए (HTML Escaped)।
 * - <%- htmlData %> : अन-एस्केप्ड raw HTML प्रिंट करने के लिए।
 * - <% JS Code %>   : JavaScript लॉजिक (if/else, loops) लिखने के लिए।
 * - <%- include('partials/header') %> : दूसरे EJS कंपोनेंट्स को जोड़ने के लिए।
 */

app.set("view engine", "ejs");

app.get("/ejs-demo", (req, res) => {
  res.render("index", {
    title: "EJS Learning",
    user: "Sahil",
    skills: ["JavaScript", "Express", "Node.js"]
  });
});


// ==============================================================================
// 8. STATIC FILES CONFIGURATION
// ==============================================================================

/**
 * [Static Files]
 * Images, CSS फ़ाइलें, और क्लाइंट-साइड JavaScript फ़ाइलों को सर्व करने के लिए।
 * 
 * Steps:
 * 1. रूट में 'public' नाम का फ़ोल्डर बनाएं।
 * 2. public के अंदर सब-फ़ोल्डर बनाएं: stylesheets, images, javascripts
 * 3. Express को static folder बताएं: app.use(express.static("public"));
 * 4. Path Rule: HTML/EJS में पाथ देते समय '/public' नहीं लिखा जाता,
 *    सीधा subfolder का पाथ देते हैं (जैसे: href="/stylesheets/style.css" या src="/images/logo.png")।
 */

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


// ==============================================================================
// 9. ERROR HANDLING MIDDLEWARE
// ==============================================================================

/**
 * [Error Handling Middleware]
 * एक्सप्रेस में एरर हैंडलिंग मिडलवेयर को हमेशा सभी राउट्स के सबसे नीचे लिखा जाता है।
 * इसकी पहचान इसमें मौजूद 4 पैरामीटर्स से होती है: (err, req, res, next)
 */

// 404 Route Handler (अगर कोई राउट मैच न हो)
app.use((req, res, next) => {
  res.status(404).send("404: Page Not Found");
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(err.status || 500).send({
    message: err.message || "Internal Server Error"
  });
});


// ==============================================================================
// 10. EXPRESS GENERATOR & ROUTER ARCHITECTURE
// ==============================================================================

/**
 * [Express Generator]
 * यह एक CLI टूल है जो पूरे प्रोजेक्ट का फ़ोल्डर स्ट्रक्चर और बेसिक बॉयलरप्लेट
 * कोड अपने आप तैयार कर देता है।
 * 
 * Global Installation:
 * npm i -g express-generator
 * 
 * New Project Creation:
 * 1. express myapp --view=ejs
 * 2. cd myapp
 * 3. npm install
 * 4. npx nodemon   (package.json में bin/www को nodemon चलाता है)
 * 
 * Folder Structure:
 * - bin/www          : सर्वर स्टार्ट और पोर्ट कॉन्फ़िगरेशन
 * - public/          : images, javascripts, stylesheets
 * - routes/          : राउट फ़ाइलें (index.js, users.js)
 * - views/           : EJS टेम्पलेट्स (index.ejs, error.ejs)
 * - app.js           : मेन ऐप्लिकेशन कॉन्फ़िगरेशन
 * 
 * Router Concept (app.get vs router.get):
 * Express Generator में सारे राउट्स app.js में नहीं लिखे जाते।
 * अलग-अलग फ़ाइलों में 'express.Router()' का उपयोग होता है:
 */

// Example: routes/users.js
const router = express.Router();

router.get("/profile", (req, res) => {
  res.send("User Profile via Router");
});

// app.js में इसे ऐसे माउंट किया जाता है:
// const usersRouter = require("./routes/users");
// app.use("/users", usersRouter);


// ==============================================================================
// 11. MONGODB & MONGOOSE SETUP (DATABASE)
// ==============================================================================

/**
 * [Database Terms & Clarifications]
 * - Relational (SQL): Database -> Tables -> Rows -> Columns
 * - Non-Relational (MongoDB): Database -> Collections -> Documents -> Fields
 * 
 * सही समझ:
 * - Database: पूरी ऐप्लिकेशन का डेटा कंटेनर।
 * - Collection: डेटा की श्रेणी (जैसे 'users', 'products')।
 * - Document: कलेक्शन के अंदर का एक रिकॉर्ड या ऑब्जेक्ट (JSON/BSON)।
 * - Schema: डॉक्यूमेंट का ब्लूप्रिंट या ढाँचा (कौन-से फ़ील्ड्स होंगे और डेटा टाइप क्या होगा)।
 * - Model: स्कीमा का प्रोग्रामेटिक इंटरफ़ेस, जिसकी मदद से हम डेटाबेस पर CRUD ऑपरेशन्स करते हैं।
 * 
 * Installation:
 * npm i mongoose
 */

const mongoose = require("mongoose");

// 1. Connection Setup
mongoose.connect("mongodb://127.0.0.1:27017/myDatabase")
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Database connection error:", err));

// 2. Schema Creation (models/user.js)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

// 3. Model Creation & Export
// mongoose.model("User", userSchema) => यह MongoDB में 'users' नाम का कलेक्शन बनाएगा।
const userModel = mongoose.model("User", userSchema);

/**
 * [Mongoose CRUD Operations - Syntax Cheat Sheet]
 */
async function crudExamples() {
  // CREATE
  const newUser = await userModel.create({ username: "sahil99", name: "Sahil", age: 27 });

  // READ
  const allUsers = await userModel.find(); // सभी यूज़र्स
  const singleUser = await userModel.findOne({ username: "sahil99" }); // एक यूज़र

  // UPDATE
  await userModel.findOneAndUpdate({ username: "sahil99" }, { age: 28 }, { new: true });

  // DELETE
  await userModel.findOneAndDelete({ username: "sahil99" });
}


// ==============================================================================
// 12. SESSIONS & COOKIES
// ==============================================================================

/**
 * [Difference: Session vs Cookie]
 * - Cookie: क्लाइंट (ब्राउज़र) साइड पर स्टोर होती है। डेटा साइज़ सीमित (लगभग 4KB) और कम सुरक्षित।
 * - Session: सर्वर साइड पर स्टोर होता है। ब्राउज़र में केवल सेशन आईडी (Session ID) कुकी के रूप में रहती है। अधिक सुरक्षित।
 */

// --------------------------- A. SESSIONS ---------------------------
/**
 * Installation: npm i express-session
 */
const session = require("express-session");

app.use(session({
  resave: false,              // अगर सेशन में कोई बदलाव न हुआ हो तो दोबारा सेव न करे
  saveUninitialized: false,   // खाली या नया अन-मॉडिफाइड सेशन सेव न करे
  secret: "yourSecretKeyHere",// सेशन आईडी को एन्क्रिप्ट/साइन करने की सीक्रेट की
  cookie: { maxAge: 60000 }   // 1 मिनट की वैलिडिटी
}));

// Set Session
app.get("/set-session", (req, res) => {
  req.session.username = "Sahil";
  req.session.isLoggedIn = true;
  res.send("Session set successfully");
});

// Read Session
app.get("/get-session", (req, res) => {
  if (req.session.username) {
    res.send(`Logged in user: ${req.session.username}`);
  } else {
    res.send("No active session found");
  }
});

// Destroy Session
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error destroying session");
    res.clearCookie("connect.sid"); // डिफ़ॉल्ट सेशन कुकी साफ़ करना
    res.send("Session destroyed and logged out");
  });
});


// --------------------------- B. COOKIES ---------------------------
/**
 * Installation: npm i cookie-parser
 */
const cookieParser = require("cookie-parser");

app.use(cookieParser("cookieSecretKey")); // Signed कुकीज़ के लिए सीक्रेट पास कर सकते हैं

// Set Cookie
app.get("/set-cookie", (req, res) => {
  res.cookie("theme", "dark", {
    maxAge: 24 * 60 * 60 * 1000, // 1 दिन
    httpOnly: true               // XSS अटैक से सुरक्षा (क्लाइंट-साइड JS इसे एक्सेस नहीं कर सकता)
  });
  res.send("Cookie has been set");
});

// Read Cookie
app.get("/read-cookie", (req, res) => {
  const userCookies = req.cookies;
  res.send(userCookies);
});

// Delete Cookie
app.get("/clear-cookie", (req, res) => {
  res.clearCookie("theme");
  res.send("Cookie has been deleted");
});