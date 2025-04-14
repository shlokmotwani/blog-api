const { PrismaClient } = require("../../prisma/generated/prisma");
const prisma = new PrismaClient();

const createUser = async (user) => {
  const alreadyExists = findUser(user.email);
  if (alreadyExists) {
    return {
      message: "Email address already registered!",
    };
  }
  await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });
  return {
    message: "Signed up successfully!",
  };
};

const findUser = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return null;
  }
  return user;
};

module.exports = { createUser, findUser };
