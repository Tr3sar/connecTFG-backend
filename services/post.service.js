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

