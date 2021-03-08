var express = require('express');
var router = express.Router();
const Course = require('../models/course');
// const Accessory = require('../models/accessory');
const User = require('../models/user');
const {handlebars} = require('hbs');
const { body, validationResult } = require('express-validator');
/* GET Add Cube page. */
router.get('/', function(req, res, next) {
  console.log('add a course', {title: 'PLACEHOLDER ', loggedUser: req.user})
 // , {title: 'Create a Cube ', loggedUser: req.user}
 res.render('create');
});

router.post('/', [
    // body('title'),
    //     // .trim()
    //     // .isLength({min: 4})
    //     // .withMessage('Title Must exceed 4 Characters'),
    // body('description'),
    //     // .trim()
    //     // .isLength({min: 20})
    //     // .withMessage('Description Must Be > 20 Characters'),
    // body('imageUrl'),
        // .trim()
        // .isURL({ protocols: ['http', 'https'], require_protocol: true})
        // .withMessage('URL Must Start With HTTP or HTTPS'),
], async (req, res, next) => {
    try {
        var displayErr;
        const errors = validationResult(req);
        console.log(errors);
        if(!errors.isEmpty()){
            errors.array().forEach(error => {
                displayErr = error.msg;
                // console.log(displayErr);       
            });
            res.render('create-course', {errors: errors.array()});
            return;
        }
        console.log('create video form fired');
        // console.log(req.body);
        let data = req.body;
        let status = data.isPublic; //status = is video public or not via checkbox
        // console.log(status);
        if(status == "on"){
            let video = new Course({
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl,
                creator: "---------------------------------------",
                isPublic: true,
                startTime: new Date()
            });
            console.log(video);
            video.save()
            .then((response) => {
                console.log(response);
                res.redirect('/');
            });
        }else{
            let video = new Course({
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl,
                creator: "---------------------------------------",
                isPublic: false,
                startTime: new Date()
            });
            video.save()
            .then((response) => {
                console.log(response);
                res.redirect('/');
            });
        }
    }catch(err) {
        console.log(err);
    }});
//     let data = req.user;

//     console.log("FRROOOGGGSSS ------------------------------------------ ", data);
//     const newCourse = new Course({
//     // _id: Math.random(),
//     title: req.body.title,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl,
//     creator: req.user._id,
//     isPublic: req.body.isPublic,
//     startTime: new Date(0),

//     });
    
//     newCourse.save()
//     .then((result) => {
//         res.redirect('/')
//         console.log(result)
        
//         res.send(result);
//         })
//         .catch((err) => {
//             res.send(err);
            
//         })
// });


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
