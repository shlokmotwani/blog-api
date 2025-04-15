const {
  createPost,
  fetchPost,
  updatePost,
  deletePost,
  fetchAllPosts,
} = require("../controllers/postController");
const { verifyToken } = require("./authRouter");
const postRouter = require("express").Router();

postRouter.get("/", verifyToken, async (req, res) => {
  const posts = await fetchAllPosts();
  res.json(posts);
});

postRouter.post("/", verifyToken, async (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published,
    userId: req.user.id,
  };

  try {
    const response = await createPost(req.user, post);
    res.json(response);
  } catch (e) {
    console.error(e);
    return;
  }
});

postRouter.get("/:postID", verifyToken, async (req, res) => {
  const post = await fetchPost(Number(req.params.postID));
  if (!post) return res.sendStatus(404);
  res.json(post);
});

postRouter.put("/:postID", verifyToken, async (req, res) => {
  // Check for User Authorization
  const post = await fetchPost(Number(req.params.postID));
  if (!post) return res.sendStatus(404);
  if (req.user.id !== post.userId) return res.sendStatus(403);
  const newPost = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published,
  };
  const response = await updatePost(Number(req.params.postID), newPost);
  res.json(response);
});

postRouter.delete("/:postID", verifyToken, async (req, res) => {
  const post = await fetchPost(Number(req.params.postID));
  if (!post) return res.sendStatus(404);
  if (req.user.id !== post.userId) return res.sendStatus(403);
  const response = await deletePost(Number(req.params.postID));
  res.json(response);
});

module.exports = { postRouter };
