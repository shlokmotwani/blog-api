const bcrypt = require("bcryptjs");
const {
  fetchAllUsers,
  fetchUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { verifyToken } = require("./authRouter");
const userRouter = require("express").Router();

userRouter.get("/", verifyToken, async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.json(users);
  } catch (e) {
    console.error(e);
    return;
  }
});

userRouter.get("/:userID", verifyToken, async (req, res) => {
  try {
    const user = await fetchUser(Number(req.params.userID));
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (e) {
    console.error(e);
    return;
  }
});

userRouter.put("/:userID", verifyToken, async (req, res) => {
  try {
    // Check for User Authorization
    const user = await fetchUser(Number(req.params.userID));
    if (!user) return res.sendStatus(404);
    if (req.user.id !== user.id) return res.sendStatus(403);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newData = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    const response = await updateUser(Number(req.params.userID), newData);
    res.json(response);
  } catch (e) {
    console.error(e);
    return;
  }
});

userRouter.delete("/:userID", verifyToken, async (req, res) => {
  try {
    const user = await fetchUser(Number(req.params.userID));
    if (!user) return res.sendStatus(404);
    if (req.user.id !== user.id) return res.sendStatus(403);
    const response = await deleteUser(Number(req.params.userID));
    res.json(response);
  } catch (e) {
    console.error(e);
    return;
  }
});

module.exports = { userRouter };
