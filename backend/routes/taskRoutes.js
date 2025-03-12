const express = require('express');
const router = express.Router();
const {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus
} = require('../controllers/taskController');

// Render Add Task Form
router.get('/add', (req, res) => {
    res.render('addTask');
});

// Routes for CRUD operations
router.get('/', getTasks);
router.post('/add', addTask);
router.post('/edit/:id', updateTask);
router.post('/delete/:id', deleteTask);
router.post('/toggle/:id', toggleTaskStatus); // New route for checklist

module.exports = router;
