var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var methodOveride =require('method-override');
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const searchRouter = require('./routes/searchResult');
const cartRouter = require('./routes/cart');
// const ajaxRouter = require('./routes/ajaxcall');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret:'XASDASDA'}));
var ss;
var admin;
app.get('/',function(req,res){
   ss=req.session;
   admin=req.session;  
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', loginRouter);
app.use('/', homeRouter);
app.use('/',searchRouter);
app.use('/',cartRouter);
// app.use('/', ajaxRouter);
app.use(methodOveride('_method'));

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
