// HTTP errors (jaise 404, 500) create karne ke liye 'http-errors' package import kar rahe hain
var createError = require('http-errors');

// Express framework ko import kar rahe hain web application create karne ke liye[cite: 1, 2]
var express = require('express');

// File aur directory paths ko safely handle aur join karne ke liye Node.js ka built-in 'path' module import kar rahe hain[cite: 2]
var path = require('path');

// Client browser se aane wali cookie headers ko parse karne ke liye 'cookie-parser' import kar rahe hain[cite: 1, 2]
var cookieParser = require('cookie-parser');

// Incoming HTTP requests ko terminal/console me log karne ke liye 'morgan' logger import kar rahe hain
var logger = require('morgan');

// './routes/index.js' file se main application routes import kar rahe hain[cite: 2]
var indexRouter = require('./routes/index');

// './routes/users.js' file se user-specific routes import kar rahe hain[cite: 2]
var usersRouter = require('./routes/users');

// Server-side session management ke liye 'express-session' package import kar rahe hain[cite: 1, 2]
var session = require("express-session");

// Main Express application instance initialize kar rahe hain[cite: 2]
var app = express();

// view engine setup
// Express ko bata rahe hain ki hamari saari template views files kis folder path ('views') par hain[cite: 1, 2]
app.set('views', path.join(__dirname, 'views'));

// Template engine ke roop me 'ejs' set kar rahe hain taaki dynamic HTML render ho sake[cite: 1, 2]
app.set('view engine', 'ejs');

// Session middleware configure kar rahe hain taaki server user data ko session me store rakh sake[cite: 1, 2]
app.use(session({
  // Agar session data me koi badlav nahi hua hai toh use dobara session store me save na kare[cite: 1, 2]
  resave: false,

  // Naye aur unmodified session ko bina data save hone se roke[cite: 1, 2]
  saveUninitialized: false,

  // Session cookie ko sign aur encrypt karne ke liye secret key pass kar rahe hain[cite: 1, 2]
  secret: "hobolaholabola"
}));

// Development mode me har request ke HTTP method, URL aur status code ko console me log kar rahe hain
app.use(logger('dev'));

// Incoming requests ke JSON formatted payload/data ko parse karke req.body me daalne ke liye[cite: 2]
app.use(express.json());

// HTML form submission se aane wale URL-encoded data ko parse karne ke liye[cite: 2]
app.use(express.urlencoded({ extended: false }));

// Incoming request headers se cookies parse karke req.cookies object provide karne ke liye middleware[cite: 1, 2]
app.use(cookieParser());

// 'public' folder ki static files (images, CSS, JS) ko direct browser access ke liye serve kar rahe hain[cite: 1, 2]
app.use(express.static(path.join(__dirname, 'public')));

// Root URL ('/') par aane wali saari requests ko 'indexRouter' par route kar rahe hain[cite: 2]
app.use('/', indexRouter);

// '/users' URL par aane wali requests ko 'usersRouter' par forward kar rahe hain[cite: 2]
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// Agar upar ka koi bhi route match nahi hota, toh 404 Not Found error generate karke next error handler ko bhej rahe hain[cite: 2]
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// Global centralized error handling middleware jo kisi bhi error aane par run hota hai (4 arguments ke sath)[cite: 2]
app.use(function(err, req, res, next) {
  // Error message ko template ke locals variables me set kar rahe hain
  res.locals.message = err.message;

  // Development environment me pura error stack pass kar rahe hain, production me empty object bhejte hain security ke liye
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Response ka HTTP status code set kar rahe hain (agar err.status nahi hai toh default 500)[cite: 2]
  res.status(err.status || 500);

  // 'views/error.ejs' file ko render karke browser ko error page dikha rahe hain[cite: 2]
  res.render('error');
});

// App instance ko export kar rahe hain taaki 'bin/www' file is server ko listen/start kar sake[cite: 2]
module.exports = app;