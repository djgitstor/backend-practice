var express = require('express');
var app = express();
// const bodyParser = require('body-parser');
var indexRouter = require('./routs/index');
var userRouter = require('./routs/user');
var cors = require('cors');
const corsOptions = {
   origin:'http://localhost:5173',
   methods:['GET','POST','PUT','DELETE'],
   credentials:true
 }
// app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(express.json());
app.use('/', indexRouter);
app.use('/',userRouter)

app.listen(5000);