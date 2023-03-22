import { Router } from 'express'
import { createGroup, getGroups } from '../controllers/group.controller.js'

const groupRouter = Router()
groupRouter.put('/', createGroup)
groupRouter.get('/', getGroups)

export default groupRouter