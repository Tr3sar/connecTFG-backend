import mongoose from 'mongoose'
const { Schema, model } = mongoose

import normalize from 'normalize-mongoose'

const groupSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        require: true
    },
    members: [{
        type: Schema.ObjectId,
        ref: 'User',
        require: true
    }],
    messages: [{
        type: Schema.ObjectId,
        ref: 'Message',
        require: true
    }],
    file: [{
        type: String,
        require: true
    }],
    description: {
        type: String,
        require: false
    }
})

groupSchema.plugin(normalize)
const GroupModel = model('Group', groupSchema)

export default GroupModel