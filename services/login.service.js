const bcrypt = require('bcryptjs');
const User = require('./models/user');

async function login(username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    return null; // User not found
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return null; // Password doesn't match
  }

  return user;
}

module.exports = { login };
