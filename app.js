var createError = require('http-errors');
var express = require('express'); // Require library of code that is Express
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const hbs = require('hbs');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const { body, validationResult } = require('express-validator');
const User = require('./models/user');
const flash = require('connect-flash');
var session = require('express-session');
const searchRouter = require('./routes/search');
var indexRouter = require('./routes/user-home');
var createRouter = require('./routes/create');
// var attachAccessoryRouter = require('./routes/attach');
var detailsRouter = require('./routes/course-details');
// var aboutRouter = require('./routes/about')
const editRouter = require('./routes/edit');
var enrollRouter = require('./routes/enroll');
// const cookieRouter = require('./routes/cookie');
const deleteRouter = require('./routes/delete');
var app = express(); 

require('dotenv').config()

mongoose.connect(process.env.DB_URI,  {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then( (res) => console.log('db connected'))
    .catch((err) => console.log(err));

// View Engine Setup
app.set('views', path.join(__dirname, 'views')); // setting folder for public files
 // setting view engine to hbs, engine compiles views and data into HTML
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'hbs');
hbs.registerPartials('./views/partials');

hbs.registerHelper('isEqual', function (expectedValue, value) {
  return value === expectedValue;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({    
  secret: "frogs",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'static')));
app.use(passport.session());
app.use(flash());
app.use('/', indexRouter); // Router for home page 
app.use('/search', searchRouter);
app.use('/create', createRouter);
// app.use('/accessory/attach', attachAccessoryRouter);
app.use('/course-details', detailsRouter);
app.use('/delete', deleteRouter);
app.use('/enroll', enrollRouter);
// app.use('/about', aboutRouter);
app.use('/edit', editRouter);
// app.use('/cookie', cookieRouter);

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
  req._requestStarted = new Date();
  next();
});

// Routes
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});

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
