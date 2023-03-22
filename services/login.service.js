const User = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = {};


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
module.exports = authService;
