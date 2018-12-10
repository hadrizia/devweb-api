const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  photoUrl: String,
  birth: {type: Date, default: Date.now},
  gender: String,
  password: String,
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', userSchema);