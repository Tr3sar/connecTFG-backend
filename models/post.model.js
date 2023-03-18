const mongoose = require('mongoose');
import normalize from 'normalize-mongoose'

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {
    versionKey: false,
    timestamps: true
})

postSchema.plugin(normalize)
const PostModel = model('Post', postSchema)

export default PostModel