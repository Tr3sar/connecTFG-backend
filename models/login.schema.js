const SALT_WORK_FACTOR = 10;
import mongoose, { mongo } from 'mongoose'
const { Schema,model} = mongoose
import normalize from 'normalize-mongoose'

const loginSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

loginSchema.plugin(normalize)
const loginModel = model('Login', loginSchema)
export default loginModel
