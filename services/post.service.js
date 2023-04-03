import PostModel from '../models/post.schema.js';

export const getAllPosts = async () => {
  try{
    return await PostModel.find().sort('createdAt');
} catch (e) {
    throw Error('Error fetching Posts')
}
};
export const createPost = async function(title, content){
  try{
    const post = new PostModel({
      title: title,
      content: content,
      author: '64284841e13f20e618b22c19',
      applicant: [],
      likes: 0,
      closed: false,
      comment:[]
    })

    return await post.save();

} catch (e) {
    throw Error('Error creating group');
}}

export const getPostById = async function(id) {
  return await post.findById(id);
};



export const deletePost = async function(id) {
  await Post.findByIdAndDelete(id);
};

export const getPostsPageable = async (page, limit, sort) => {
  const sortObj = {
      [sort?.property || 'name']: sort?.direction === 'DESC' ? 'DESC' : 'ASC'
  };
  try {
     const options = {
          page: parseInt(page) + 1,
          limit,
          sort: sortObj
      };

      return await PostModel.paginate({}, options);
  } catch (e) {
      throw Error('Error fetching posts page');
  }    
}

export const updatePost = async (id,title, content, author) => {
  try{
      const post = await PostModel.findById(id);
      if (!post) {
          throw Error('There is no post with that id')
      }

      return await PostModel.findByIdAndUpdate(id, {title, content, author});
  } catch (e) {
      throw new Error('Error updating post')
  }
}