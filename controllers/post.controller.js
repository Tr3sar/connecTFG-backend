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
  const {title, content} = req.body
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

export const getPosts = async (req, res) => {
  try {
    const posts = await PostService.getPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await PostService.getPostById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
  const {id} = req.params
  const {title, content} = req.body

  try{
      const postUpdated = await PostService.updatePost(id, title, content)
      res.status(200).json(
          postUpdated
      )
  } catch (err) {
      res.status(400).json({
          msg: err.toString()
      })
  }
}

export const deletePost = async (req, res) => {
  try {
    await PostService.deletePost(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostsPageable = async (req, res) => {
  const page = req.body.pageable.pageNumber || 0;
  const limit = req.body.pageable.pageSize || 5;
  const sort = req.body.pageable.sort || null;

  try {
      const response = await PostService.getPostsPageable(page, limit, sort);
      res.status(200).json({
          content: response.docs,
          pageable: {
              pageNumber: response.page - 1,
              pageSize: response.limit
          },
          totalElements: response.totalDocs
      });
  } catch (err) {
      res.status(400).json({
          msg: err.toString()
      });
  }
}

