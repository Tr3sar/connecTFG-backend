import { Router } from 'express'
import { postLogin } from '../controllers/login.controller.js'

const loginRouter = Router()
loginRouter.post('/', postLogin);

export default loginRouter



