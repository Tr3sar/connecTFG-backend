import mongoose, { mongo } from 'mongoose'
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
    member_id: {
        type: Array,
        require: true
    },
    message: {
        type: Array,
        require: true
    },
    file: {
        type: Array,
        require: true
    },
    description: {
        type: String,
        require: false
    }
})

groupSchema.plugin(normalize)
const GroupModel = model('Group', groupSchema)

export default GroupModel