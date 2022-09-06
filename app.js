require("dotenv").config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require("cors");

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/admin');
var patient = require('./routes/patient');
var price = require('./routes/price');
var accounting = require('./routes/accounting');
var domain = require('./routes/domain');
var doctor = require('./routes/doctor');
var schedule = require('./routes/schedule');
var lab = require('./routes/lab');
var admin = require('./routes/admin');
var visit = require('./routes/visit');
var service = require('./routes/service');









var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())




mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("connection is success");
}).catch((error) => console.log(error));








app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use("/api/patient", patient);
// app.use('/', patient);
app.use("/api/price", price);
app.use("/api/accounting", accounting);
app.use("/api/domain", domain);
app.use("/api/doctor", doctor);
app.use("/api/schedule", schedule);
app.use("/api/lab", lab);
app.use("/api/admin", admin);
app.use("/api/visit", visit);
app.use("/api/service", service);







module.exports = app;
