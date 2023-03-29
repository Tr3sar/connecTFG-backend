import { Router } from 'express'
import { createGroup, getGroups, getGroupsExpanded } from '../controllers/group.controller.js'
import { createMessage } from '../controllers/group.controller.js'

const groupRouter = Router()
groupRouter.put('/', createGroup)
groupRouter.get('/', getGroupsExpanded)
groupRouter.post('/messages', createMessage)

export default groupRouter