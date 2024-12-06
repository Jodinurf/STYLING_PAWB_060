const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { isLoggedIn } = require('../middlewares/middleware');

// Routes for To-Do List
router.get('/', isLoggedIn, todoController.getTodos);
router.post('/add', isLoggedIn, todoController.addTodo);
router.post('/:id/done', isLoggedIn, todoController.markTodoAsDone);
router.post('/:id/delete', isLoggedIn, todoController.deleteTodo);
router.post('/edit/:id', isLoggedIn, todoController.editTodo);

module.exports = router;
