const Post = require('./post.model');


export const getAllPosts = async () => {
  return await Post.find({});
};
export const createPost= async () = {

}

