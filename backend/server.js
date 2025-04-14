require("dotenv").config();
const express = require("express");
const { authRouter } = require("./routes/authRouter");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Server started. Listening to port: ${PORT}`);
});
