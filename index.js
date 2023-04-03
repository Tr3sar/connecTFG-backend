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
import fs from 'fs';
import https from 'https';

 
config();
connectDB(process.env.MONGODB_URL);
const app = express();

const options = {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
  };

const server = https.createServer(options, app);
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

// server.on('request', (req, res) => {
//     if (req.url.startsWith('/user')) {
//       userRouter(req, res);
//     }
//   });

// app.listen(process.env.PORT, () => {
//     console.log(`DB server running on port ${process.env.PORT}`);
// });

server.listen(443, () => {
    console.log('Socket.io server running on port 443')
})


io.on('connection', (socket) => {
    console.log('Cliente conectado')

    socket.on('join', (group_id) => {
        console.log('Cliente unido al grupo: ', group_id);
        socket.join(group_id);
      });

    socket.on('leave', (group_id) => {
        console.log('client desconectado del grupo: ', group_id)
    })

    socket.on('newMessage', (data) => {
        console.log('Nuevo mensaje recibido: ', data);
        // Guardaría el mensaje en la base de datos
        io.to(data.groupId).emit('message', data.message);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
})
