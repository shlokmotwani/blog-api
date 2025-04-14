const bcrypt = require("bcryptjs");
const authRouter = require("express").Router();

authRouter.get("/", (req, res) => {
  res.json({
    message: "Reached GET /",
  });
});

authRouter.get("/sign-up", (req, res) => {
  res.json({
    message: "reached GET /sign-up",
  });
});

authRouter.get("/login", (req, res) => {
  res.json({
    message: "reached GET /login",
  });
});

authRouter.post("/sign-up", async (req, res) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    } 
});

authRouter.post("/login", (req, res) => {});

module.exports = { authRouter };
