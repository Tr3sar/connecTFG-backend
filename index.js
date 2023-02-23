const express = require('express');
const mongodb = require('mongodb');
import notificationRouter from './routes/notification.routes';

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use('/notification', notificationRouter);
