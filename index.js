import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { config } from 'dotenv';

import { createServer } from 'http';
import { Server } from 'socket.io';

import notificationRouter from './routes/notification.routes.js'
import groupRouter from './routes/group.routes.js'
import loginRouter from './routes/login.routes.js';
import postRouter from './routes/post.route.js';
import userRouter from './routes/user.routes.js'

import { updateUserStatus } from './controllers/user.controller.js';

config();
connectDB(process.env.MONGODB_URL);
const app = express();

const server = createServer(app)
const io = new Server(server, {cors: {
    origin: "http://localhost:4200"
  }})

app.use(cors({
    origin: '*'
}));

app.use(express.json())
app.use("/notification", notificationRouter)
app.use("/group", groupRouter)
app.use("/login", loginRouter)
app.use("/feed", postRouter)
app.use("/user", userRouter)

app.listen(process.env.PORT, () => {
    console.log(`DB server running on port ${process.env.PORT}`);
});

server.listen(3000, () => {
    console.log('Socket.io server running on port 3000')
})

io.on('connection', (socket) => {
    console.log('Cliente conectado', socket.handshake.query.userId)
    updateUserStatus(socket.handshake.query.userId, 'connected');

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

    socket.on('disconnect', async () => {
        console.log('Cliente desconectado', socket.handshake.query.userId);
        await updateUserStatus(socket.handshake.query.userId, 'disconnected');
    });
})
