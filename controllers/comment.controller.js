import * as commentService from '../services/comment.service.js';

export const createComment = async (req, res) => {
  const {postId} = req.params
  const {authorId, message} = req.body
  
  try {
    const comment = await commentService.createComment(postId, message , authorId );
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteComment = async (req, res) => {
  const {
    postId,
    commentId
  } = req.params;
  const {
    _id: userId
  } = req.user;

  try {
    const comment = await commentService.getCommentById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }

    if (comment.author.toString() !== userId && comment.post.author.toString() !== userId) {
      return res.status(403).json({
        message: 'Not authorized to delete this comment'
      });
    }

    await commentService.deleteComment(commentId, postId);
    res.status(200).json({
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateComment = async (req, res) => {
  const {
    postId,
    commentId
  } = req.params;
  const {
    message
  } = req.body;
  const {
    _id: userId
  } = req.user;

  try {
    const comment = await commentService.getCommentById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }

    if (comment.author.toString() !== userId && comment.post.author.toString() !== userId) {
      return res.status(403).json({
        message: 'Not authorized to update this comment'
      });
    }

    const updatedComment = await commentService.updateComment(commentId, message, postId);
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};