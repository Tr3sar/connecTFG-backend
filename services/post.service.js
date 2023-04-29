import PostModel from '../models/post.schema.js';

export const getAllPosts = async () => {
  try {
    console.log("asdqweqweqwe")
    return await PostModel.find().populate('comments', 'applicants').sort('createdAt');

  } catch (e) {
    throw Error('Error fetching Posts')
  }
};

export const createPost = async function (title, content) {
  try {
    const post = new PostModel({
      title: title,
      content: content,
      author: '64284841e13f20e618b22c19',
      applicants: [],
      likes: 0,
      closed: false,
      comment: []
    })
    return await post.save();
  } catch (e) {
    throw Error('Error creating group');
  }
}

export const getPostById = async function (id) {
  return await post.findById(id);

};



export const deletePost = async function (id) {
  try {
    await PostModel.findByIdAndDelete(id);
  } catch (e) {
    throw Error('Error deleting post')
  }
};

export const getPostsPageable = async (page, limit, sort) => {
  const sortObj = {
    [sort ?.property || 'createdAt']: sort ?.direction === 'DESC' ? 'DESC' : 'ASC'
  };
  try {
    const options = {
      page: parseInt(page) + 1,
      limit,
      sort: sortObj,
      populate: [{
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User'
        }
      }, {
        path: 'author'
      }]
    };

    return await PostModel.paginate({}, options);
  } catch (e) {
    throw Error('Error fetching posts page');
  }
}

export const updatePost = async (id, title, content) => {
  try {
    const post = await PostModel.findById(id);
    if (!post) {
      throw Error('There is no post with that id')
    }

    return await PostModel.findByIdAndUpdate(id, {
      title,
      content
    });
  } catch (e) {
    throw new Error('Error updating post')
  }
}

export const addApplicant = async (postId, applicantId) => {
  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      throw Error('There is no post with that id')
    }
    console.log('Post encontrado')
    if (!post.applicants.includes(applicantId)) {
      post.applicants.push(applicantId);
    }
    console.log(post.applicants)
    return await post.save()
  } catch (e) {
    throw Error('Error adding applicant')
  }
}

export const getApplicantsToUser = async (userId) => {
  try {
    const postsFromUser = await PostModel.find({
      author: userId
    }).populate('applicants')

    const applicants = postsFromUser.reduce((acc, post) => {
      return acc.concat(post.applicants)
    }, []);

    const uniqueApplicants = [...new Set(applicants)]

    return uniqueApplicants;

  } catch (e) {
    throw Error('Error fetching applicants')
  }
}

export const rejectApplicant = async (userId, applicantId) => {
  try {
    const posts = await PostModel.find({
      author: userId
    });
    if (!posts) {
      throw Error('There is no post with that arguments')
    }

    for (const post of posts) {
      if (post.applicants.includes(applicantId)) {
        post.applicants = post.applicants.filter(applicant => {
          applicant.id != applicantId;
        })
        await post.save()
      }
    }
    return posts;
  } catch (e) {
    throw Error('Error rejecting applicant')
  }
}