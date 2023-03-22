const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },  
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  applicant: {
    type: [String],
    required: true,
    default: []
  }, 
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  comment: {
    type: [String],
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  closed: {
    type: Boolean,
    required: true,
    default: false
  }


});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
