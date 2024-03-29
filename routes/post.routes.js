import {
    Router
} from 'express';
import {
    createPost,
    getPostsPageable,
    updatePost,
    getPostsFromUser,
    deletePost,
    addApplicant,
    getApplicantsToUser,
    rejectApplicant,
    closePost
} from '../controllers/post.controller.js';
import {
    check
} from 'express-validator';
import validateFields from '../middleware/validateFields.js'

const postRouter = Router()
postRouter.post('/create', createPost)
postRouter.delete('/:id', deletePost)
postRouter.put('/:id', updatePost)
postRouter.get('/:userId', getPostsFromUser)
postRouter.put('/apply/:postId', addApplicant)
postRouter.post('/close', closePost);
postRouter.get('/applicants/:userId', getApplicantsToUser)
postRouter.put('/applicants/:userId', rejectApplicant)
postRouter.post('/', [
    check('pageable').not().isEmpty(),
    check('pageable.pageSize').not().isEmpty(),
    check('pageable.pageNumber').not().isEmpty(),
    validateFields
], getPostsPageable)


export default postRouter