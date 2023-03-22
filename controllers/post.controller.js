export const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  console.log(req.body);
  res.status(200).json(1);
}

