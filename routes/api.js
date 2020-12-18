const express = require("express");
const users = require("./api/users");
const todos = require("./api/todos");
const app = express.Router();

app.get("/", (req, res) => {
  if (req.headers["user-agent"].toLowerCase().indexOf("postman") > -1) {
    res.json("Hey there! Developer!");
  } else {
    res.json("Welcome to API!");
  }
});

app.post("/", express.json(), (req, res) => {
  res.json(req.body);
});
app.use("/users", users);
app.use("/todos", todos);

module.exports = app;
