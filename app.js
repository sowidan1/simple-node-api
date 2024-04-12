const express = require("express");

const app = express();

app.use(express.json());

const users = [];

app.get("/hello", (req, res) => {
  res.send("Hello!");
});

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.post("/users", (req, res) => {
  const user = req.body;
  const findUser = users.find((x) => x.id == user.id);
  if (findUser) {
    res.status(400).send("user already exists");
    return;
  }
  users.push(req.body);
  res.status(201).send("created user");
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const findUser = users.find((x) => x.id == id);
  if (!findUser) {
    res.status(404).send("user not found");
    return;
  }
  users.splice(users.indexOf(findUser), 1);
  res.status(200).send("user deleted");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
