const { PrismaClient } = require("../../prisma/generated/prisma");
const { deleteAllPostsByUser } = require("./postController");
const prisma = new PrismaClient();

const createUser = async (user) => {
  try {
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
  } catch (e) {
    console.error(e);
    return;
  }
};

const fetchUser = async (userID) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (e) {
    console.error(e);
    return;
  }
};

const updateUser = async (userID, newData) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        name: newData.name,
        email: newData.email,
        password: newData.password,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (e) {
    console.error(e);
    return;
  }
};

const deleteUser = async (userID) => {
  //delete all posts by user, the delete the user
  try {
    const user = await fetchUser(userID);
    const msg = await deleteAllPostsByUser(userID, user.name);
    await prisma.user.delete({
      where: {
        id: userID,
      },
    });
    return {
      message: msg.message + "\n" + "User deleted successfully!",
    };
  } catch (e) {
    console.error(e);
    return;
  }
};

const fetchAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (e) {
    console.error(e);
    return;
  }
};

module.exports = {
  createUser,
  fetchUser,
  updateUser,
  deleteUser,
  fetchAllUsers,
};
