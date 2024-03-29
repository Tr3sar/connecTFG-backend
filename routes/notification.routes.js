import { Router } from 'express'
import { createNotification, deleteNotification, getNotificationsByUserId } from '../controllers/notification.controller.js'

const notificationRouter = Router()
notificationRouter.post('/', createNotification)
notificationRouter.get('/:user_id', getNotificationsByUserId)
notificationRouter.delete('/:id', deleteNotification)

export default notificationRouter
