const { PrismaClient } = require("../../prisma/generated/prisma");
const prisma = new PrismaClient();

const createPost = async (user, post) => {
  try {
    await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
        userId: user.id,
      },
    });
    return {
      message: "Post created successfully!",
    };
  } catch (e) {
    console.error(e);
    return;
  }
};

const fetchPost = async (postID) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postID,
      },
    });
    if (!post) {
      return null;
    }
    return post;
  } catch (e) {
    console.error(e);
    return;
  }
};

const updatePost = async (postID, newPost) => {
  try {
    const post = await prisma.post.update({
      where: {
        id: postID,
      },
      data: {
        title: newPost.title,
        content: newPost.content,
        published: newPost.published,
      },
    });
    if (!post) {
      return null;
    }
    return post;
  } catch (e) {
    console.error(e);
    return;
  }
};

const deletePost = async (postID) => {
  try {
    await prisma.post.delete({
      where: {
        id: postID,
      },
    });
    return {
      message: "Post deleted successfully!",
    };
  } catch (e) {
    console.error(e);
    return;
  }
};

const deleteAllPostsByUser = async (userID, userName) => {
  try {
    await prisma.post.deleteMany({
      where: {
        userId: userID,
      },
    });
    return {
      message: `All posts from ${userName} deleted successfully!`,
    };
  } catch (e) {
    console.error(e);
    return;
  }
};

const fetchAllPosts = async () => {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (e) {
    console.error(e);
    return;
  }
};

module.exports = {
  createPost,
  fetchPost,
  updatePost,
  deletePost,
  deleteAllPostsByUser,
  fetchAllPosts,
};
