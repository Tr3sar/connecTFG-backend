import mongoose from 'mongoose'
const { Schema, model } = mongoose

import normalize from 'normalize-mongoose'

const userSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    img_url: {
        type: String,
        require: true
    },
    tfg_url: {
        type: String,
        require: true
    },
    degree: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    groups: [{
        type: Schema.ObjectId,
        ref: 'Group',
        require: true
    }],
    notifications: [{
        type: Schema.ObjectId,
        ref: 'Notification',
        require: true
    }],
    posts: [{
        type: Schema.ObjectId,
        ref: 'Post',
        require: true
    }],
    rol: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    }
})
