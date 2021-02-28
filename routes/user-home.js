var express = require('express');
var router = express.Router();
const passport = require('passport');
const Course = require('../models/course');
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  Course.find()
    .then((response) => {
      //console.log('all the courses are ', response)
      res.render('user-home', {title: 'Frogs', course: response, loggedUser: req.user});    //, {title: 'Frogs', cube: response, loggedUser: req.user}
    })
    .catch((err) => console.log(err));
});



// /// LOGION
router.get('/login', function(req, res) {
  res.render('login', {title: 'frog-in page', loggedUser: req.user});   ///, {title: 'frog-in page', loggedUser: req.user}
});

router.post('/login', passport.authenticate('local'), function(req, res) {  // , { failureRedirect: '/login', failureFlash: true }
    //console.log("FROGGED INTO THE MATRIX")
    res.redirect('/');
  });


// ///REGISTER 
  router.get('/register', function(req, res, next) {
    //console.log('register page');
    res.render('register', { title: '--Register--' });
  });



router.post('/register', function(req, res, next) {
    User.register(new User({username: req.body.username}), req.body.password, function(err) {
    if (err) {
        console.log('error while user register!', err);
        return next(err);
    }
    console.log('user registered!');
    res.redirect('/');
    });
});


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
