const { PrismaClient } = require("../../prisma/generated/prisma");
const prisma = new PrismaClient();

const createPost = async (user, post) => {
    console.log(user.id);
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
};

const findPost = async (id) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  if (!post) {
    return null;
  }
  return post;
};

module.exports = { createPost, findPost };
