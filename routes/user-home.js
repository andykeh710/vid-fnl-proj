var express = require('express');
var router = express.Router();
// const passport = require('passport');
// const Cube = require('../models/cube');
// const User = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
//   Cube.find()
res.render('user-home');
//     .then((response) => {
//       //console.log('all the cubes are ', response)
//       res.render('user-home');    //, {title: 'Frogs', cube: response, loggedUser: req.user}
//     })
//     .catch((err) => console.log(err));
});



// /// LOGION
router.get('/login', function(req, res) {
  res.render('login');   ///, {title: 'frog-in page', loggedUser: req.user}
});

// router.post('/login', passport.authenticate('local'), function(req, res) {  // , { failureRedirect: '/login', failureFlash: true }
//     res.redirect('/');
//   });

  router.get('/register', function(req, res, next) {
    console.log('register page');
    res.render('register', { title: '--Register--' });
    
    
});
// ///REGISTER 
// router.post('/register', function(req, res, next) {
//   // console.log("RES ------------------------------------------ get routre", res)
//   // console.log('registering user');
//   User.register(new User({username: req.body.username}), req.body.password, function(err) {
//     if (err) {
//       console.log('error while user register!', err);
//       return next(err);
//     }

//     console.log('user registered!');

//     res.redirect('/');
//   });
// });

module.exports = router;
