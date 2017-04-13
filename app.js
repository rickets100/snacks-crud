var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var hbs = require('hbs');
var dotenv = require('dotenv').config()

var index = require('./routes/index');
var snacks = require('./routes/snacks')
var app = express();

// ======== VIEW ENGINE SETUP ========
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerPartials(__dirname + '/views/snacks/shared')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// ======== OTHER SETUP =========
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))


// ======== PATHS & SUCH ========
app.use('/', index);
// line below means all snacks routes (everything inside the snacks.js file will be prefixed with ""/snacks"
app.use('/snacks', snacks)

// ======== ERROR HANDLING SECTION =========
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ======== ERROR HANDLER ========
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
