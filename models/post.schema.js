import { Schema, model } from 'mongoose'
import normalize from 'normalize-mongoose'

const postSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
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
const PostModel = model('Post', postSchema)
export default PostModel
