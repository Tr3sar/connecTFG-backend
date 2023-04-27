import mongoose from 'mongoose';

const {
    Schema,
    model
} = mongoose;

import normalize from 'normalize-mongoose'

const commentSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    message: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true,
});

commentSchema.plugin(normalize)
const CommentModel = model('Comment', commentSchema);
export default CommentModel;