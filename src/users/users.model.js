const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

var userSchema = new Schema({
  name: String,
  username: String,
  photoUrl: String,
  birth: {type: Date, default: Date.now},
  email: String,
  gender: String,
  password: String,
  createdAt: {type: Date, default: Date.now},
});

userSchema.methods.verifyPassword = function(password, callback) {
  return (password == this.password);
};

module.exports = mongoose.model('User', userSchema);