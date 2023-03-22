import * as PostService from '../services/post.service.js'

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  console.log(req.body);
  const {title,content} = req.body
  try{
    const post = await PostService.createPost(title,content);
    res.status(200).json({
        post
    });
} catch (err) {
    res.status(400).json({
        msg: err.toString()
    });
}
}

