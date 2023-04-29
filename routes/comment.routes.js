import {
    Router
} from 'express'
import {
    createComment,
    deleteComment,
    updateComment
} from '../controllers/comment.controller.js';

const commentRouter = Router();

// Create a comment for a post
commentRouter.post('/:postId/', createComment);

// Update a comment for a post
commentRouter.put('/:commentId', updateComment);

// Delete a comment for a post
commentRouter.delete('/:commentId', deleteComment);

export default commentRouter;