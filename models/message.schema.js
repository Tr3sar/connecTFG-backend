import mongoose from 'mongoose'
const { Schema, model } = mongoose

import normalize from 'normalize-mongoose'

const messageSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId
    },
    text: {
        type: String,
        require: true
    },
    emitter: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

messageSchema.plugin(normalize)
const MessageModel = model('Message', messageSchema)

export default MessageModel