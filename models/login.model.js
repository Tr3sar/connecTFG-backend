const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
import { Schema, model, Model } from 'mongoose';
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, required: true 
  },
  password: { 
    type: String, required: true 
  },
});

module.exports = mongoose.model('User', UserSchema);