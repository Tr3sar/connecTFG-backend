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
  const {title, content, author} = req.body
  try{
      const post = await PostService.createPost(title,content,author);
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

export const getPostsFromUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await PostService.getPostsFromUser(userId);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
  const {id} = req.params
  const {title, content} = req.body

  try{
      const postUpdated = await PostService.updatePost(id, title, content, closed)
      res.status(200).json(
          postUpdated
      )
  } catch (err) {
      res.status(400).json({
          msg: err.toString()
      })
  }
}

export const closePost = async (req, res) => {
  const {postId}  = req.body;
  try {
    console.log("PreClose Post Controller", postId)
    const post = await PostService.closePost(postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to close post' });
  }
};

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
  const filterValue = req.body.filterValue || '';

  try {
      const response = await PostService.getPostsPageable(page, limit, sort, filterValue);
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

export const addApplicant = async (req, res) => {
  const { postId } = req.params;
  const { applicantId } = req.body;

  try{
    const updatedPost = await PostService.addApplicant(postId, applicantId);
    
    res.status(200).json(
      updatedPost
    
    )
  } catch (err) {
    res.status(400).json({
      msg: err.toString()
    })
  }
}



export const getApplicantsToUser = async (req, res) => {
  const { userId } = req.params;
  try{
    const applicants = await PostService.getApplicantsToUser(userId);
    res.status(200).json(
      applicants
    )
  } catch(err) {
    res.status(400).json({
      msg: err.toString()
    })
  }
}

export const rejectApplicant = async (req, res) => {
  const { userId } = req.params;
  const {applicantId} = req.body;

  try{
    const posts = await PostService.rejectApplicant(userId, applicantId);
    res.status(200).json(
      posts
    )
  } catch (err) {
    res.status(400).json({
      msg: err.toString()
    })
  }
}
