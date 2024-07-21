const { addTask, getTasks, deleteTask, getTask, updateTask } = require('../models/taskModel');

const createTask = (req, res) => {
    const { title, description, status } = req.body;
    const task = addTask({ title, description, status });
    return res.status(201).json(task);
};

const getAllTasks = (req, res) => {
    const tasks = getTasks();
    return res.json(tasks);
};

const deleteTaskById = (req, res) => {
    const { id } = req.params;
    deleteTask(id, res);
    return res;
};

const getTaskById = (req, res) => {
    const { id } = req.params;
    const task = getTask(id, res);
    return res.json(task);
}

const updateTaskById = (req, res) => {
    const { title, description, status } = req.body;
    const { id } = req.params;
    const task = updateTask({ id, title, description, status }, res);
    return res.json(task);
}

module.exports = { createTask, getAllTasks, deleteTaskById, getTaskById, updateTaskById };
