var express = require('express');
var router = express.Router();
const Course = require('../models/course');

router.get('/:id/', (req, res, next) => {
    let id = req.params.id;
    // console.log('edit id is', id);
    Course.findOne({_id: id})
        .then((course) => {
             res.render('edit', {course: course, loggedUser: req.user});
    });    
});

router.post('/:id', async (req, res) => {    
    let course;
    let data = req.body;
     try {
        course = await Course.findById(req.params.id);
        course.title = data.title, 
        course.description = data.description, 
        course.imageUrl = data.imageUrl, 
        course.isPulic = data.isPulic,
        await course.save();
        res.redirect('/');
    }catch(err) {
        if(err) throw err;
            if (course == null) {
                res.redirect('/');
            }else {
                res.render('/course-details', { course: course, errorMessage: 'Error Editing'});
            }       
    }     
});

module.exports = router;