import mongoose from 'mongoose'
const {
    Schema,
    model
} = mongoose

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
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    social_url: [{
        type: String,
        required: true
    }],
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
    rol: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    conections: [{
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }]
})
userSchema.plugin(normalize);
const UserModel = model('User', userSchema);
export default UserModel;