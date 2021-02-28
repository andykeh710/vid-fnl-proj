const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Cube = require('./cube');

const courseSchema = new Schema({
  title: String,
  description: String,
  imageUrl: String,
  creator: String,
  isPublic: false,
  startTime: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  
  // title: String,
  // description: String,
  // imageUrl: String,
  // isPublic: false,
  // startTime: Date,
  // users:[]  //{ type: mongoose.Schema.Types.ObjectId, ref: 'Cube' }

})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

