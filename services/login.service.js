import User from '../models/login.schema.js';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt'



export const postLogin = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return {
    user: {
      id: user._id,
      username: user.username
    },
    token
  };
};

