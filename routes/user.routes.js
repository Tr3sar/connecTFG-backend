import { Router } from 'express'
import { acceptUserConection, getUserById, getUserConections, getUsers, updateUser } from '../controllers/user.controller.js'

const userRouter = Router()
userRouter.get('/', getUsers)

userRouter.put('/:id', updateUser)
userRouter.get('/:id', getUserById)
userRouter.put('/conections/:id', acceptUserConection)
userRouter.get('/conections/:id', getUserConections)

export default userRouter