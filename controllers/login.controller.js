const express = require('express');
const router = express.Router();
const userService = require('./user.service');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await userService.login(username, password);
  if (user) {
    // Successful login
    res.status(200).json({ user });
  } else {
    // Failed login
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
