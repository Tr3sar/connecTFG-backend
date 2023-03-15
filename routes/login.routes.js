const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userController = require('./user.controller');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Parse request body as JSON
app.use(express.json());

// Routes
app.use('/users', userController);

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
