var express = require('express');
var router = express.Router();
const Course = require('../models/course');
const User = require('../models/user');
//THIS IS FOR ADDING A Course TO A SPECIFIC USER (WHEN THEY CLICK ENROLL BUTTON ON VIDEO DETAILS PAGE)
let courseID;
let courseTitle;
//runs the enroll get request to display the video to be enrolled in...
router.get('/:id', function(req, res, next) {
    courseID = req.params.id;
  console.log('The enroll fired');
  Course.findOne({_id: courseID})
    .then((results) => {
      console.log("enroll request is ", results);
      courseTitle = results.title;
      console.log(courseTitle);
      console.log("the users results from the details get route is 1111111111111111111111111111111111------------------------", results.users);
      res.render('enroll', {course: results, user: req.user});
    });
});
router.post('/:id', function(req, res, next) {
  let courseID = req.params.id;
  console.log('The enroll POST request fired', courseID);
  let person = req.user.username;
  let personID = req.user._id;
  console.log('person id', personID);
  // update the VIDEO to associate the user
  Course.findOneAndUpdate(
    {_id: courseID},
    //this pushes the username into the array held in the VIDEO model
    { $push: {"users": personID}},
    //upsert true means if it doesn't exist create it (false is the default value)
    { upsert: true }, 
    function(err) {if (err) console.log(err);}
);
  //update the USER to add the enrolled video "course"
  User.findOneAndUpdate(
      {_id: personID}, 
      { $push: {"courses": courseID}},
      { upsert: true }, 
      function(err) {if (err) console.log(err);
  });
res.redirect("/");
});

module.exports = router;