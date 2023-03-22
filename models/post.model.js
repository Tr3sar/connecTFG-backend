const mongoose = require('mongoose');
import normalize from 'normalize-mongoose'

const postSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
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
const postModel = model('post', postSchema)

export default postModel