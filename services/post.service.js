import PostModel from '../models/post.schema.js';

export const getAllPosts = async () => {
  try {
    return await PostModel.find().populate('comments', 'applicants', "closed").sort('createdAt');

  } catch (e) {
    throw Error('Error fetching Posts')
  }
};

export const createPost = async function (title, content,author) {
  try {
    const post = new PostModel({
      title: title,
      content: content,
      author: author,
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

export const getPostsPageable = async (page, limit, sort, filterValue) => {
  const sortObj = {
    [sort ?.property || 'createdAt']: sort ?.direction === 'ASC' ? 'ASC' : 'DESC'
  };
  try {
    const filterObj = {
      closed: filterValue == "Closed" ? true : false
    }
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
    return await PostModel.paginate({
      closed: filterObj.closed
    }, options);
  } catch (e) {
    throw Error('Error fetching posts page');
  }
}

export const updatePost = async (id, title, content, closed) => {
  try {
    const post = await PostModel.findById(id);
    if (!post) {
      throw Error('There is no post with that id')
    }

    return await PostModel.findByIdAndUpdate(id, {
      title,
      content,
      closed
    });
  } catch (e) {
    throw new Error('Error updating post')
  }
}

export const closePost = async (id) => {
  try {
    console.log("Entra al Service Back", id)
    const post = await PostModel.findById(id);
    console.log("Post:", post)
    if (!post) {
      throw new Error('Post not found');
    }
    console.log("Post.id:",post.id)
    console.log("Post:",post)
    post.closed = true;
    console.log("Post post closed:",post)
    await post.save();

    return post;
  } catch (error) {
    throw new Error('Failed to close post');
  }

}

export const getPostsFromUser = async function (userId) {
  try {

    const posts = await PostModel.find({ author: userId })
      .sort('createdAt')
      .populate('author');
    return posts;
  } catch (e) {
    throw Error('Error fetching user posts');
  }
};

export const addApplicant = async (postId, applicantId) => {
  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      throw Error('There is no post with that id')
    }
    if (!post.applicants.includes(applicantId)) {
      post.applicants.push(applicantId);
    }
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