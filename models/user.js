const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const usersSchema = new Schema({
    // id: mongoose.id, 
    username: String,
    password: String,
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course'}]  //{ type: Schema.Types.ObjectId, ref: 'Cube'}
});
 
usersSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', usersSchema);



module.exports = User;