import { Router } from 'express'
import { createGroup, getGroups, getGroupsExpanded, getMessagesFromGroup, createMessage, getGroupsFromUser, updateGroup, deleteGroupById } from '../controllers/group.controller.js'

const groupRouter = Router()
groupRouter.put('/', createGroup)
groupRouter.get('/', getGroupsExpanded)
groupRouter.post('/messages', createMessage)
groupRouter.get('/messages/:id', getMessagesFromGroup)
groupRouter.get('/groups/:userId', getGroupsFromUser)
groupRouter.put('/:id', updateGroup)
groupRouter.delete('/:id', deleteGroupById)

export default groupRouter