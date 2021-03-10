var express = require('express');
var router = express.Router();
const {handlebars} = require('hbs');
var router = express.Router();
const Course = require('../models/course');


/* GET details listing. */
router.get('/:uid', async function(req, res) {
    try{
        console.log(" -----------------------------------------------------------------------------   ", req.user)
        // if(err) throw (err);
        let id = req.params.id;
        let user = req.user._id.toString();
        let isCreator = false;
        console.log("the user id is", user);
        //.populate('users')

        Course.findOne({_id: id}).populate('users')
            .then((course) => {
            if(user === course.creator) {
                isCreator = true;
            }
            console.log("The single video results from the details get route is ", course);
            //go get all the users held in mongodb
            let userIDs = course.users.map(x => {return x._id.toString();});
            console.log("The user IDs are ", userIDs);

            //iterate thru users array and look for match

            let isEnrolled;
            for(let i = 0; i < userIDs.length; i++){
                console.log(user);
                console.log(userIDs[i]);
                if(user == userIDs[i]){
                console.log("there is a match fired");
                isEnrolled = true;
                }else{
                console.log("there is not a match fired");
                isEnrolled = false;
                }
            }
            //render based on isEnrolled flag
            if(isEnrolled == true){
                return res.render('course-details', { course: course, loggedUser: req.user, isEnrolled: isEnrolled, isCreator: isCreator });
            }else{
                return res.render('course-details', { course: course, loggedUser: req.user, isEnrolled: isEnrolled, isCreator: isCreator });
            }
            });
        }catch(error){
            if(error){
            console.log(error);
            res.sendStatus(500);
            return;
            }
        }
    // let id = req.params.uid;
    // console.log("FROG TEST -------------------------------------------------------",id);    //works
    // // res.render('course-details')
    // Course.findOne({_id: id}).populate('users')
    // .then((thisCourse) => {
    //     res.render('course-details', { title: 'frog time', course: thisCourse, isCreator: true, loggedUser: req.user});  //accessories: thisCube.accessories, 
    // });
    
});

module.exports = router;