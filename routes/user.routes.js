import { Router } from 'express'
import { getUsers, loginUser } from '../controllers/user.controller.js'

const userRouter = Router()
userRouter.get('/', getUsers)
//userRouter.post('/register', UserController.saveUser);
userRouter.post('/login', loginUser);





