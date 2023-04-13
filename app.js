const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

const chatRouter = require("./routes/chat");

app.use(express.static("public"));
app.use(express.json());
app.use(chatRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
