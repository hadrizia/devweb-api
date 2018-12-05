const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reportSchema = new Schema({
  title: String,
  content: String,
  createdDate: {
      type: Date, 
      default: Date.now},
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  isAnonymous:{
      type: Boolean,
      default: true
  },
  numLikes: {
    type: Number,
    default: 0
  },
  numDislikes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Report', reportSchema);