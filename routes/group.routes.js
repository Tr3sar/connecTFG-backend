import { Router } from 'express'
import { createGroup, getGroupsExpanded, getMessagesFromGroup, createMessage, getGroupsFromUser, updateGroup, deleteGroupById, getGroupFromTwoUsers } from '../controllers/group.controller.js'

import multer from 'multer'
const upload = multer()

const groupRouter = Router()
groupRouter.put('/', createGroup)
groupRouter.get('/', getGroupsExpanded)
groupRouter.post('/messages', upload.single('file'), createMessage)
groupRouter.get('/messages/:id', getMessagesFromGroup)
groupRouter.get('/groups/:userId', getGroupsFromUser)
groupRouter.put('/:id', updateGroup)
groupRouter.delete('/:id', deleteGroupById)
groupRouter.get('/two-users/:userId1/:userId2', getGroupFromTwoUsers)

export default groupRouter