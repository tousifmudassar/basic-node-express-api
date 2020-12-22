const express = require("express");
const morgan = require("morgan");
const root = require("./routes/root");
const app = express();
const port = 3000;
// const todos = ["Milk", "Curd", "Sugar"];

app.use(express.json());
app.use(morgan("dev"));
app.use("/", root);

// app.get("/", (req, res) => {
//   res.json("Hello, GeeksforGeeks API Server!");
// });
// app.get("/api/", (req, res) => {
//   res.json("This is the root of API Server!");
// });
// app.get("/api/todos", (req, res) => {
//   res.json(todos);
// });
// app.get("/api/todos/:id", (req, res) => {
//   const param = +req.params.id;
//   if (!todos[param]) {
//     res.status(404).json("Error Not Found");
//   } else {
//     res.json(todos[param]);
//   }
// });

app.listen(port, () => {
  console.log(`Server started in port ${port}.`);
});
