import CommentModel from '../models/comment.schema.js';
import PostModel from '../models/post.schema.js';

export const createComment = async (postId, message, authorId) => {
  try {
    const comment = new CommentModel({
      message,
      author: authorId,
      likes: 0,
    });

    const post = await PostModel.findById(postId);

    if (!post) {
      throw new Error('There is no post with that id');
    }

    if (!post.comments) {
      post.comments = []
    }

    post.comments.push(comment);
    await comment.save();
    await post.save();
    return comment;

  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const updateComment = async (commentId, userId, message) => {
  try {
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      throw Error('Comment not found');
    }

    if (comment.author.toString() !== userId) {
      throw Error('You are not authorized to edit this comment');
    }

    comment.message = message;
    return await comment.save();
  } catch (e) {
    throw Error('Error updating comment');
  }
};

export const deleteComment = async function (postId, commentId, userId) {
  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      throw Error('There is no post with that id')
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      throw Error('There is no comment with that id')
    }

    if (comment.author !== userId && post.author !== userId) {
      throw Error('You do not have permission to delete this comment')
    }

    if (!comment.deleted) {
      comment.deleted = true;
      comment.deletedBy = userId;
      await post.save();
    }
  } catch (e) {
    throw Error('Error deleting comment')
  }
}