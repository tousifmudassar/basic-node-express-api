const express = require("express");
const users = require("../../constants/users");
const app = express.Router();

app.get("/", (req, res) => {
  res.json(
    users.map((u, UserID) => {
      const a = { UserID, ...u };
      delete a.Password;
      return a;
    })
  );
});
app.get("/:id", (req, res) => {
  const UserID = +req.params.id;
  if (!users[UserID]) {
    res.status(404).json("Error! Todo Not Found!");
  } else {
    const a = { UserID, ...users[UserID] };
    delete a.Password;
    res.status(202).json(a);
  }
});
module.exports = app;
