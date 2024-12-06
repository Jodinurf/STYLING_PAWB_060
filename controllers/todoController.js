const db = require('../config/db');

const getTodos = (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).send('Unauthorized');
    }

    const sql = 'SELECT * FROM todo WHERE user_id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching todos:', err);
            return res.status(500).send('Error fetching todos');
        }
        res.render('todos', {
            layout: 'layouts/main-layouts',
            title: 'My To-Do List',
            todos: results,
            showNavbar: true,
            showFooter: true,
        });
    });
};

// Add a new To-Do item
const addTodo = (req, res) => {
    const { title, description } = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).send('Unauthorized');
    }

    const sql = 'INSERT INTO todo (title, description, user_id) VALUES (?, ?, ?)';
    db.query(sql, [title, description, userId], (err, result) => {
        if (err) {
            console.error('Error adding todo:', err);
            return res.status(500).send('Error adding todo');
        }
        res.redirect('/todos');
    });
};

// Mark a To-Do item as done
const markTodoAsDone = (req, res) => {
    const { id } = req.params;

    const sql = 'UPDATE todo SET is_done = 1 WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error marking todo as done:', err);
            return res.status(500).send('Error marking todo as done');
        }
        res.redirect('/todos');
    });
};

// Delete a To-Do item
const deleteTodo = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM todo WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting todo:', err);
            return res.status(500).send('Error deleting todo');
        }
        res.redirect('/todos');
    });
};

// Edit a To-Do item
const editTodo = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const sql = 'UPDATE todo SET title = ?, description = ? WHERE id = ?';
    db.query(sql, [title, description, id], (err, result) => {
        if (err) {
            console.error('Error editing todo:', err);
            return res.status(500).send('Error editing todo');
        }
        res.redirect('/todos');
    });
};

module.exports = {
    getTodos,
    addTodo,
    markTodoAsDone,
    deleteTodo,
    editTodo,
};