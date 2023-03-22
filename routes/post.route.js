import { Router } from 'express'
import {createPost, getAllPosts} from '../controllers/post.controller.js'

const postRouter = Router()
postRouter.post('/', createPost)
postRouter.get('/', getAllPosts);

export default postRouter

