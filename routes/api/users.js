const express = require("express");
const users = require("../../constants/users");
const app = express.Router();

app.use((req, res, next) => {
  const { Authenticated } = req.session;
  if (
    Authenticated ||
    (req.path === "/" && req.method === "POST") ||
    req.path === "/login"
  ) {
    next();
  } else {
    res.status(403).json("Please login to see!");
  }
});

app.get("/", (req, res) => {
  res.json(
    users.map((u, UserID) => {
      const a = { UserID, ...u };
      delete a.Password;
      return a;
    })
  );
});
app.post("/", (req, res) => {
  const { Username, Name, Password, LinkedIn } = req.body;
  if (!Username || !Password || !Name) {
    res.status(400).json({
      Success: false,
      Message: "Please give at least Username, Password and Name."
    });
  } else {
    if (
      Username.trim().length < 4 ||
      Password.trim().length < 4 ||
      Name.trim().length < 4
    ) {
      res.status(400).json({
        Success: false,
        Message:
          "Username, Password and Name should be at least 4 characters in length."
      });
    } else {
      const matches = users.filter(u => u.Username === Username);
      if (matches.length > 0) {
        res.status(409).json({
          Success: false,
          Message: "User already exists!"
        });
      } else {
        users.push({
          Username,
          Name,
          Password,
          LinkedIn
        });
      }
      res.status(201).json({
        Success: true,
        Message: `User ${Username} hase been added to the data base.`
      });
    }
  }
});
app.get("/login", (req, res) => {
  //This needs to be implemented on session basis.
  const { Authenticated } = req.session;
  res.json({ Authenticated });
});
app.post("/login", (req, res) => {
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    res.status(400).json("Need both Username and Password.");
  } else {
    const matched = users.filter(
      u =>
        u.Username.toLowerCase() === Username.toLowerCase() &&
        u.Password === Password
    );
    if (matched.length === 1) {
      const user = { ...matched[0] };
      delete user.Password;
      req.session.Authenticated = user;
      res.json({ Sucess: true });
    } else if (matched.length === 0) {
      req.session.destroy(() => {
        res.status(401).json("Oops! Bad Credentials! Try Again!");
      });
    } else if (matched.length > 1) {
      req.session.destroy(() => {
        res.status(500).json("A lot of users are matching!");
      });
    }
  }
});
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ Success: true });
  });
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
app.delete("/:id", (req, res) => {
  const UserID = +req.params.id;
  if (users[UserID] && users[UserID].Name) {
    users[UserID] = {};
    res.status(204).json();
  } else {
    res.status(404).json("Error! User Not Found!");
  }
});
app.put("/:id", (req, res) => {
  const UserID = +req.params.id;
  if (users[UserID]) {
    users[UserID] = req.body;
    res.status(202).json({
      Sucess: true,
      Message: `Updated the user ${users[UserID].Name}.`
    });
  } else {
    res.status(404).json("Error! User Not Found!");
  }
});

module.exports = app;
