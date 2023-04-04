import mongoose from 'mongoose';
import normalize from 'normalize-mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

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
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  applicants: [{
    type: String,
    required: true
  }],
  likes: {
    type: Number,
    required: true
  },
  closed: {
    type: Boolean,
    required: true,
    default: false
  },
  comment: [{
    type: String,
    required: true
  }],
  
}, {
    versionKey: false,
    timestamps: true
})

postSchema.plugin(normalize);
postSchema.plugin(mongoosePaginate);

const PostModel = model('Post', postSchema);
export default PostModel;
