var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const passport = require('passport');                     //google pass
const dotenv = require('dotenv');                        //dotenv module
dotenv.config();

var indexRouter = require('./routes/index');
const auth = require('./routes/auth');
const chat = require('./routes/chat');

var app = express();

const db=require('./helpers/db')();         //database

//middlewares
const isAuthenticated=require('./middleware/isAuthenticated');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'bower_components')));

app.use(session({                                                     //Sessions
  secret: process.env.SESSION_SECRET_KEY,                             
  resave: false,
  saveUninitialized: true,
  cookie:{ maxAge: 14 * 24 * 3600000 }                     //session-time
}));

// passport.js
app.use(passport.initialize());                                       //Google Passport
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth',auth);
app.use('/chat',isAuthenticated, chat);                               //Middleware-->isAuthenticated

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
