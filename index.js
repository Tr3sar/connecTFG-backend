import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { config } from 'dotenv';

import notificationRouter from './routes/notification.routes.js'
import loginRouter from './routes/login.routes.js';
import postRouter from './routes/post.route.js';

config();
connectDB(process.env.MONGODB_URL);
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json())
app.use("/notification", notificationRouter)
app.use("/login", loginRouter)
app.use("/post", postRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
