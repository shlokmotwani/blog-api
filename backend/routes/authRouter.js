require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, fetchUser } = require("../controllers/userController");
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

authRouter.post("/sign-up", verifyNewEntry, async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };
  let message;
  try {
    message = await createUser(user);
  } catch (e) {
    message = String(e);
  }
  res.json(message);
});

authRouter.post("/login", async (req, res) => {
  const user = await fetchUser(req.body.email);
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    res.sendStatus(401);
  }
  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
      id: user.id,
    },
    process.env.AUTH_SECRET
  );

  res.json({ token });
});

function verifyToken(req, res, next) {
  const bearer = req.headers["authorization"];
  const token = bearer.split(" ")[1];
  jwt.verify(token, process.env.AUTH_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

//checks if an email address is already registered
async function verifyNewEntry(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      return res.status(400).send("Email address already registered!");
    }
    next();
  } catch (e) {
    console.error(e);
    return;
  }
}

module.exports = { authRouter, verifyToken };
