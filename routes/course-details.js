var express = require('express');
var router = express.Router();
const Course = require('../models/course');

/* GET details listing. */
router.get('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log("FROG TEST -------------------------------------------------------",id);    //works
    // res.render('course-details')
    Course.findOne({_id: id}).populate('users')
    .then((thisCourse) => {
        res.render('course-details', { title: 'frog time', course: thisCourse, isCreator: true, loggedUser: req.user});  //accessories: thisCube.accessories, 
    });
    
});

module.exports = router;