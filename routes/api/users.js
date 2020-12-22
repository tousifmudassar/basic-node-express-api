const express = require("express");
const users = require("../../constants/users");
const app = express.Router();

app.get("/", (req, res) => {
  //This needs to be implemented on session basis.
  const Authenticated = false;
  if (Authenticated) {
    res.json(
      users.map((u, UserID) => {
        const a = { UserID, ...u };
        delete a.Password;
        return a;
      })
    );
  } else {
    res.status(403).json("Please login to see!");
  }
});

app.get("/login", (req, res) => {
  res.json({ Authenticated });
});
app.post("/login", (req, res) => {
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    res.status(400).json("Need both Username and Password");
  } else {
    const matched = users.filter(
      u =>
        u.Username.toLowerCase() === Username.toLowerCase() &&
        u.Password === Password
    );
    if (matched.length === 1) {
      Authenticated = true;
      res.json({ Sucess: true });
    } else if (matched.length === 0) {
      Authenticated = false;
      res.status(401).json("Oops! Bad Credentials!");
    }
  }
});

app.get("/:id", (req, res) => {
  const UserID = +req.params.id;
  if (users[UserID]) {
    const a = { UserID, ...users[UserID] };
    delete a.Password;
    res.status(200).json(a);
  } else {
    res.status(404).json("Error! User Not Found!");
  }
});

module.exports = app;
