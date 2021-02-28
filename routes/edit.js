var express = require('express');
var router = express.Router();
const Video = require('../models/course');

router.get('/:id/', (req, res, next) => {
    let id = req.params.id;
    // console.log('edit id is', id);
    Video.findOne({_id: id})
        .then((video) => {
             res.render('edit', {course: course, user: req.user});
    });    
});

router.post('/:id', async (req, res) => {    
    let video;
    let data = req.body;
     try {
        video = await Video.findById(req.params.id);
        video.title = data.title, 
        video.description = data.description, 
        video.imageUrl = data.imageUrl, 
        video.isPulic = data.isPulic,
        await video.save();
        res.redirect('/home');
    }catch(err) {
        if(err) throw err;
            if (video == null) {
                res.redirect('/');
            }else {
                res.render('/course-details', { course: course, errorMessage: 'Error Editing Video'});
            }       
    }     
});

module.exports = router;