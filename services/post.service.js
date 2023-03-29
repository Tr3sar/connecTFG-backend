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
    })

    return await post.save();

} catch (e) {
    throw Error('Error creating group');
}}

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