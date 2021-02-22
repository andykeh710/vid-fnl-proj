var express = require('express');
var router = express.Router();
const Course = require('../models/course');
// const Accessory = require('../models/accessory');
const User = require('../models/users');
/* GET Add Cube page. */
router.get('/', function(req, res, next) {
  console.log('add a course', {title: 'PLACEHOLDER ', loggedUser: req.user})
 // , {title: 'Create a Cube ', loggedUser: req.user}
 res.render('create');
});

// router.get('/course', function(req, res, next){
//     console.log("FROG TIME")
//     res.render('create', {title: 'Create Course', loggedUser: req.user});
// });

router.post('/', function(req, res, next) {
  
    // let data = req.body;
    // console.log("FRROOOGGGSSS ------------------------------------------ ", data);

    const newCourse = new Course({
    // _id: Math.random(),
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    isPublic: req.body.isPublic,
    startTime: new Date(0),
    users: ['1'],
    });
    
    newCourse.save()
    res.redirect('/')
    .then((result) => {
        console.log(result)
        res.send(result);
        })
        .catch((err) => {
            res.send(err);
        })
});


// router.get('/accessory', function(req, res, next) {
//  //console.log('Create accessory');
//   res.render('createAccessory', { title: 'Add Accessory', loggedUser: req.user})
// });

// router.post('/course', function(req, res, next) {
//   //console.log("the accessory form is ", req.body)
//   const newCourse = new Course({
//     _id: Math.random(),
//     title: req.body.title,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl,
//     isPublic: false,
//     createdAt: _startTime,
//     users: [],
//     });

//     newCourse.save()
//     res.redirect('/')
//     .then((result) => {
//         console.log(result)
//         res.send(result);
//         })
//         .catch((err) => {
//             res.send(err);
//         })
// //   newCourse.save()
// //     .then((res) => { console.log('the new accessory is ', res)})
// //     res.redirect('/');
// })


module.exports = router;
