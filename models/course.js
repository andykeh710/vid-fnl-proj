const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Cube = require('./cube');

const courseSchema = new Schema({
  title: String,
  description: String,
  imageUrl: String,
  isPublic: false,
  createdAt: String,
  users:[]  //{ type: mongoose.Schema.Types.ObjectId, ref: 'Cube' }

})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

