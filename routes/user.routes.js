import { Router } from 'express'
import { createUser, getUsers, updateUser } from '../controllers/user.controller.js'

const userRouter = Router()
userRouter.get('/', getUsers)
userRouter.post('/register', createUser)
userRouter.put('/:id', updateUser)

export default userRouter