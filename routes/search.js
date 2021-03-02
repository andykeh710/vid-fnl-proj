var express = require('express');
var router = express.Router();
const Course = require('../models/course');
const db = require('mongodb');


router.get('/', async (req, res) => {
    // console.log('req', req.title);
let searchText = req.query.search;
// console.log('search text:', searchText);
    let course;
    try {
        course = await Course.findOne({ title: searchText }).lean().exec(); 
        console.log('Found course :', course);
        
        // res.status(200).json(video);
        res.render('search', { course: course, user: req.user });
    } catch(err) {
        res.status(404).json(err);
    }  
});
module.exports = router;