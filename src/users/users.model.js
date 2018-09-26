const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  photoUrl: String,
  birth: {type: Date, default: Date.now},
  email: String,
  gender: String,
  password: String,
  createdAt: {type: Date, default: Date.now},
});


module.exports = mongoose.model('User', userSchema);