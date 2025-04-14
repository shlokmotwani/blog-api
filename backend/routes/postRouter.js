const { createPost } = require("../controllers/postController");
const { verifyToken } = require("./authRouter");
const postRouter = require("express").Router();

postRouter.get("/:postID", verifyToken, (req, res) => {
  res.json({
    message: "Reached GET /posts/:postID",
  });
});

postRouter.post("/", verifyToken, async (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published,
    userId: req.user.id,
  };
  let message;
  try {
    message = await createPost(req.user, post);
  } catch (e) {
    message = String(e);
  }
  res.json(message);
});

module.exports = { postRouter };
