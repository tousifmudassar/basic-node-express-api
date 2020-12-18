const express = require("express");
const users = require("../../constants/users");
const app = express.Router();

app.get("/", (req, res) => {
  res.json("Welcome to Users!");
});

module.exports = app;
