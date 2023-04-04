import { Router } from 'express'
import { createUser, getUserById, getUsers, updateUser } from '../controllers/user.controller.js'

const userRouter = Router()
userRouter.get('/', getUsers)
userRouter.post('/register', createUser)
userRouter.put('/:id', updateUser)
userRouter.get('/:id', getUserById)

export default userRouter