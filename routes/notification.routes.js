import { Router } from 'express'
import { createNotification } from '../controllers/notification.controller.js'

const notificationRouter = Router()
notificationRouter.put('/', createNotification)

export default notificationRouter