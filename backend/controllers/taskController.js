const Task = require('../models/Task');

// @desc Get all tasks
exports.getTasks = (req, res) => {
    Task.getAll((err, tasks) => {
        if (err) {
            console.error('Error fetching tasks:', err);
            return res.status(500).send('Failed to fetch tasks');
        }
        res.render('index', { tasks });
    });
};

// @desc Add a new task
exports.addTask = (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).send('Title is required');
    }

    Task.addTask({ title, description }, (err) => {
        if (err) {
            console.error('Error adding task:', err);
            return res.status(500).send('Failed to add task');
        }
        res.redirect('/');
    });
};

// @desc Update a task
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (!title) {
        return res.status(400).send('Title is required for updating a task');
    }

    Task.updateTask(id, { title, description, completed }, (err) => {
        if (err) {
            console.error('Error updating task:', err);
            return res.status(500).send('Failed to update task');
        }
        res.redirect('/');
    });
};

// @desc Toggle task completion
exports.toggleTaskStatus = (req, res) => {
    const { id } = req.params;
    const { currentStatus } = req.body;

    Task.toggleTaskStatus(id, currentStatus, (err) => {
        if (err) {
            console.error('Error toggling task status:', err);
            return res.status(500).send('Failed to toggle task status');
        }
        res.redirect('/');
    });
};

// @desc Delete a task
exports.deleteTask = (req, res) => {
    const { id } = req.params;

    Task.deleteTask(id, (err) => {
        if (err) {
            console.error('Error deleting task:', err);
            return res.status(500).send('Failed to delete task');
        }
        res.redirect('/');
    });
};
