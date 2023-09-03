import { Router } from 'express'
import {login, createUser} from '../controllers/login.controller.js'

const loginRouter = Router()
loginRouter.post('/login', login);
loginRouter.post('/register', createUser)
export default loginRouter



