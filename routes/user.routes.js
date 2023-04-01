import { Router } from 'express'
import { createUser, getUsers } from '../controllers/user.controller.js'

const userRouter = Router()
userRouter.get('/', getUsers)
userRouter.post('/register', createUser)

export default userRouter





