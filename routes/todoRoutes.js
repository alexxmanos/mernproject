const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, 'Todolist!');
    req.user = verified;
    next();
  } catch {
    res.status(400).send('Invalid Token');
  }
};

router.get('/', authMiddleware, async (req, res) => {
  const todos = await Todo.find({ user: req.user.userId });
  res.send(todos);
});

router.post('/', authMiddleware, async (req, res) => {
  const todo = new Todo({
    description: req.body.description,
    user: req.user.userId,
  });
  await todo.save();
  res.send(todo);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo || todo.user.toString() !== req.user.userId) return res.status(404).send('Todo not found');

  todo.description = req.body.description || todo.description;
  await todo.save();
  res.send(todo);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo || todo.user.toString() !== req.user.userId) return res.status(404).send('Todo not found');
  
  res.send('Todo deleted');
});

module.exports = router;
