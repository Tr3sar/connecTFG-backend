import { Router } from 'express'
import { createNotification } from '../controllers/notification.controller'



const notificationRouter = Router()
notificationRouter.put('/', createNotification)

export default notificationRouter