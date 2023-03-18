const Post = require('./post.model');
const postService = {};

postService.getAllPosts = async () => {
  return await Post.find({});
};

module.exports = postService;
