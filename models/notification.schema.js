import mongoose, { mongo } from 'mongoose'
const { Schema, model } = mongoose

import normalize from 'normalize-mongoose'

const notificationSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId
    },
    message: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    versionKey: false,
    timestamps: true
})

notificationSchema.plugin(normalize)
const NotificationModel = model('Notification', notificationSchema)

export default NotificationModel