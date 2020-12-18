const express = require("express");
const users = require("../../constants/users");
const app = express.Router();

app.get("/", (req, res) => {
  res.json(
    users.map(u => {
      const a = { ...u };
      delete a.Password;
      return a;
    })
  );
});
app.get("/:id", (req, res) => {
  const id = +req.params.id;
  if (!users[id]) {
    res.status(404).json("Error! Todo Not Found!");
  } else {
    res.status(202).json(users[id]);
  }
});
module.exports = app;
