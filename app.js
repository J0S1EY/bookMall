var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars'); // Import express-handlebars
var fileUpload = require('express-fileupload')
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
require("dotenv").config()
var db = require('./config/dbConnect');
var session = require('express-session')


var app = express();

// Middleware setup
app.use(express.static('public'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())
app.use(session({
  secret: 'secretkey',
  resave: false, 
  saveUninitialized: false, 
  cookie: { maxAge: 60000 }
}));
// View engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layout/',
  partialsDir: __dirname + '/views/partials/'
}));

db.connectToCluster()
// Routes setup
app.use('/', usersRouter);
app.use('/admin', adminRouter);

// 404 error handling
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handling
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

