import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { config } from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import notificationRouter from './routes/notification.routes.js'
import commentRouter from './routes/comment.routes.js';
import groupRouter from './routes/group.routes.js'
import loginRouter from './routes/login.routes.js';
import postRouter from './routes/post.routes.js';
import userRouter from './routes/user.routes.js'
import fs from 'fs';
import https from 'https';


import { updateUserStatus } from './controllers/user.controller.js';
import { env } from 'process';


 
config();
connectDB(process.env.MONGODB_URL);
const app = express();

const options = {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
  };

const httpServer = createServer(app);
const server = https.createServer(options, app);
const io = new Server(httpServer, {cors: {
    origin: "http://localhost:4200"
  }})

app.use(cors({
    origin: '*'
}));

app.use(express.json())
app.use("/notification", notificationRouter)
app.use("/comment", commentRouter)
app.use("/group", groupRouter)
app.use("/auth", loginRouter)
app.use("/feed", postRouter)
app.use("/user", userRouter)

httpServer.listen(env.HTTP_PORT, () => {
    console.log(`HTTP server running on port ${env.HTTP_PORT}`)
})

/* server.listen(443, () => {
    console.log('HTTPS server running on port 443')
}) */

const usersConnected = new Map();

io.on('connection', (socket) => {
    console.log('Cliente conectado', socket.handshake.query.userId)
    updateUserStatus(socket.handshake.query.userId, 'connected');

    const socketId = socket.id;
    const userId = socket.handshake.query.userId;
    usersConnected.set(userId, socketId);

    socket.on('join', (group_id) => {
        console.log('Cliente unido al grupo: ', group_id);
        socket.join(group_id);
      });

    socket.on('leave', (group_id) => {
        console.log('client desconectado del grupo: ', group_id)
    })

    socket.on('newMessage', (data) => {
        console.log('Nuevo mensaje recibido: ', data);
        io.to(data.groupId).emit('message', data.message);
    });

    socket.on('newNotification', (data) => {
        const { userId, message } = data;
    
        const userSocketId = usersConnected.get(userId);
    
        if (userSocketId) {
          io.to(userSocketId).emit('notification', message);
        }
    });

    socket.on('disconnect', async () => {
        await updateUserStatus(socket.handshake.query.userId, 'disconnected');
        for (const [userId, socketId] of usersConnected.entries()) {
            if (socketId === socket.id) {
              usersConnected.delete(userId);
              break;
            }
        }
        console.log('Cliente desconectado', socket.handshake.query.userId);
    });
})
