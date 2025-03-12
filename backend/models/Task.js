const db = require('../config/db');

class Task {
    static getAll(callback) {
        db.all('SELECT * FROM tasks', [], callback);
    }

    static addTask({ title, description }, callback) {
        db.run(
            'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
            [title, description, 0], // Default `completed` to `0` (pending)
            callback
        );
    }

    static updateTask(id, { title, description, completed }, callback) {
        db.run(
            'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
            [title, description, completed ? 1 : 0, id],
            callback
        );
    }

    static toggleTaskStatus(id, currentStatus, callback) {
        const newStatus = currentStatus ? 0 : 1; // Toggle status
        db.run(
            'UPDATE tasks SET completed = ? WHERE id = ?',
            [newStatus, id],
            callback
        );
    }

    static deleteTask(id, callback) {
        db.run('DELETE FROM tasks WHERE id = ?', [id], callback);
    }
}

module.exports = Task;
