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
      applicants: [],
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
  try{
    await PostModel.findByIdAndDelete(id);
  } catch (e) {
    throw Error('Error deleting post')
  }
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

export const updatePost = async (id,title, content) => {
  try{
      const post = await PostModel.findById(id);
      if (!post) {
          throw Error('There is no post with that id')
      }

      return await PostModel.findByIdAndUpdate(id, {title, content});
  } catch (e) {
      throw new Error('Error updating post')
  }
}

export const addApplicant = async (id, applicantId) => {
  try{
    const post = await PostModel.findById(id);
    if (!post) {
      throw Error('There is no post with that id')
    }

    console.log('post encontradp')

    if (!post.applicants.includes(applicantId)) {
      post.applicants.push(applicantId);
    }

    return await post.save()
  } catch (e) {
    throw Error('Error adding applicant')
  }
}

export const getApplicantsToUser = async (userId) => {
  try{
    const postsFromUser = await PostModel.find({author: userId}).populate('applicants')
    
    const applicants = postsFromUser.reduce((acc, post) => {
      return acc.concat(post.applicants)
    }, []);

    const uniqueApplicants = [...new Set(applicants)]

    return uniqueApplicants;

  } catch (e) {
    throw Error('Error fetching applicants')
  }
}