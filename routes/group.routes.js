import { Router } from 'express'
import { createGroup, getGroups, getGroupsExpanded, getMessagesFromGroup, createMessage } from '../controllers/group.controller.js'

const groupRouter = Router()
groupRouter.put('/', createGroup)
groupRouter.get('/', getGroupsExpanded)
groupRouter.post('/messages', createMessage)
groupRouter.get('/messages/:id', getMessagesFromGroup)

export default groupRouter