var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var index = require('./routes/main/index.js');
var google_verification = require('./routes/google_verification/index.js')
var compression = require('compression');
var helmet = require('helmet');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({ secret: 'theseAreAFewOfMyFavouriteThings', saveUninitialized: false, resave: false}));
app.use(compression());
app.use(helmet());

app.use('/', index);
app.use('/google871789df72a533d2.html',google_verification);
app.use('/js',  express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js',  express.static(__dirname + '/node_modules/jquery/dist'));
// app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/js', express.static(__dirname + '/node_modules/vue/dist'));
app.use('/js', express.static(__dirname + '/node_modules/vee-validate/dist'));
app.use('/js', express.static(__dirname + '/node_modules/sweetalert/dist'));
app.use('/static', express.static(__dirname + '/public/img'));

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('I think your lost!');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{ title : ''});
});

module.exports = app;
