var express = require('express');
var router = express.Router();
const Course = require('../models/course');
const User = require('../models/user');
const {handlebars} = require('hbs');

router.post('/:id', async(req, res) => {
    console.log('testing post');
    let video;
    let courseId = req.params.id;
    //console.log('deleting this', courseId);    //works
        try {
            video = await Course.findById(courseId);
            await video.remove();
            res.redirect('/');
        }catch(err) {
            if(err) throw err;
            if (video == null) {
                res.redirect('/');
            } else {
                res.redirect(`/course-details/${video._id}`);
            }
        }
    // Accessory.updateMany(
    //     { "cubes": cubeId },
    //     { $pull: {"cubes": cubeId}}, 
    //     function(err, accs) {
    //         if (err) console.log(err);
    //         else console.log('Updated accessories:', accs);
    //     }
    // );

    // Course.deleteOne({_id: courseId})
    // .then(function() {console.log('Deleted cube with id', courseId);})
    // .catch(function(err) {console.log(err);});
    // res.redirect('/');
});

module.exports = router;


// router.get('/:uid', function(req, res, next) {
//     let id = req.params.uid;
//     console.log(id);    //works

//     Course.findOne({_id: id})//.populate('accessories')
//     .then((thisCourse) => {
//         res.render('deleteCoursePage', { title: 'Delete Page', course: thisCourse, isCreator: true, loggedInUser: req.user});
//     });
    
// });
