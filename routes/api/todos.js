const express = require("express");
const todos = require("../../constants/todos");
const app = express.Router();

app.get("/", (req, res) => {
  res.json(todos);
});
app.get("/:id", (req, res) => {
  const id = +req.params.id;
  if (!todos[id]) {
    res.status(404).json("Error! Todo Not Found!");
  } else {
    res.status(202).json(todos[id]);
  }
});
module.exports = app;
