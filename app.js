var helmet = require('helmet');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var validator = require('express-validator');
var session = require('express-session');

var index = require('./routes/index');
var newsletter = require('./routes/newsletter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'good',
  cookie: { httpOnly: true }
}));
app.use(csrf());
app.use(helmet());
app.use(function (req, res, next) {
  res.locals.csrftoken = req.csrfToken();
  next();
});
app.use(express.static(path.join(__dirname, 'public')));


// app.get('/', function (req, res, next) {
//   res.render('index', {
//     _csrfToken = req.csrfToken();
//   });
// });

// app.use(function (req, res, next) {
//   res.locals._csrf = req.csrfToken();
//   console.log('111');
//   next();
//   console.log('222');
// });

app.use('/', index);
app.use('/newsletter', newsletter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8888, function () { console.log("Server running on 8888") });

module.exports = app;
