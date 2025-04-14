require("dotenv").config();
const express = require("express");
const { authRouter } = require("./routes/authRouter");
const { postRouter } = require("./routes/postRouter");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/", authRouter);
app.use("/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Server started. Listening to port: ${PORT}`);
});
