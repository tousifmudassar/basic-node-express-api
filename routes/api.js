const express = require("express");
const users = require("./api/users");
const todos = require("./api/todos");
const app = express.Router();

app.get("/", (req, res) => {
  res.json("Welcome to API!");
});
app.use("/users", users);
app.use("/todos", todos);

module.exports = app;
