const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

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

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
      return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, null, (errr, hash) => {
          user.password = hash;
          next();
      });
  });
});

userSchema.method({
  comparePassword (reqPassword, userPassword) {
      return bcrypt.compareSync(reqPassword, userPassword)
  }
});

module.exports = mongoose.model('User', userSchema);