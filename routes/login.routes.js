import { Router } from 'express'
import { login, postLogin } from '../controllers/login.controller.js'

const loginRouter = Router()
loginRouter.post('/', login);

export default loginRouter



