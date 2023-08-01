const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors({origin: "*"}));
app.use(bodyParser.json());

const TODOS_FILE = 'todos.json';

async function readTodos() {
  try {
    const data = await fs.readFileSync(TODOS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

async function writeTodos(todos) {
  await fs.writeFileSync(TODOS_FILE, JSON.stringify(todos));
}

app.get('/todos', async (req, res) => {
  const todos = await readTodos();
  res.json(todos);
});

app.get('/todos/:id', async (req, res) => {
  const todos = await readTodos();
  const todo = todos.find((item) => item.id === parseInt(req.params.id));
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
  } else {
    res.json(todo);
  }
});

app.post('/todos', async (req, res) => {
  const newTodo = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
  };
  const todos = await readTodos();
  todos.push(newTodo);
  await writeTodos(todos);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
  const todos = await readTodos();
  const todoIndex = todos.findIndex((item) => item.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).json({ error: 'Todo not found' });
  } else {
    const updatedTodo = {
      id: todos[todoIndex].id,
      title: req.body.title,
      description: req.body.description,
    };
    todos[todoIndex] = updatedTodo;
    await writeTodos(todos);
    res.status(200).json(updatedTodo);
  }
});

app.delete('/todos/:id', async (req, res) => {
  const todos = await readTodos();
  const todoIndex = todos.findIndex((item) => item.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).json({ error: 'Todo not found' });
  } else {
    todos.splice(todoIndex, 1);
    await writeTodos(todos);
    res.status(200).json({ message: 'Deletion successfully done' });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(3000, () => {
  console.log('Server is up and running');
});

module.exports = app;