import express from 'express';
import User, { UserDocument } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user: UserDocument) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    user.checkPassword(password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
      return res.status(200).json({ token });
    });
  });
