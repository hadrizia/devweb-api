const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
  content: String,
  createdDate: {
      type: Date, 
      default: Date.now},
  reportId: {
    type: Schema.Types.ObjectId, 
    ref: 'Report'
  },
  userId:{
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  isAnonymous:{
      type: Boolean,
      default: true}
});

module.exports = mongoose.model('Comment', commentSchema);