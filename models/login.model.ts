const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
import { Schema, model, Model } from 'mongoose';
import { Document } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  password: string;
  checkPassword: (password: string, callback: (err: any, isMatch: any) => void) => void;
}

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods.checkPassword = function (password: string, callback: (err: any, isMatch: any) => void) {
  // Use bcrypt to compare the password with the hashed password stored in the database
};

const User: Model<UserDocument> = model<UserDocument>('User', userSchema);

export default User;

userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
