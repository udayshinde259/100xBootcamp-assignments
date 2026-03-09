// start creating server here

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

let todos = [];

app.get("/", function (req, res) {
  res.status(200).send("Hello World");
});

app.post("/create/todo", function (req, res) {
  let { title, completed, description } = req.body;
  let id = todos.length + 1;

  let newTodo = {
    id: id,
    title: title,
    completed: completed,
    description: description,
  };

  todos.push(newTodo);
  res.status(200).json(todos);
});

app.get("/todos", function (req, res) {
  res.json(todos);
});

app.get("/todo", function (req, res) {
  let id = req.query.id;
  let getTodo = null;

  if (isNaN(id)) {
    return res.status(404).json({ error: "Todo not found" });
  }

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      getTodo = todos[i];
    }
  }

  if (getTodo) {
    res.status(200).json(getTodo);
  } else {
    res.status(404).send({ error: "Todo not found" });
  }
});

app.delete("/todo", function (req, res) {
  let id = req.query.id;
  let idx = -1;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      idx = i;
    }
  }

  if (idx !== -1) {
    todos.splice(idx);

    for (let i = 0; i < todos.length; i++) {
      todos[i].id = i + 1;
    }

    res.status(200).send("Todo is deleted successfully");
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});


app.listen(3000);