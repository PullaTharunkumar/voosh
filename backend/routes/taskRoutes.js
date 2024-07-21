const express = require('express');
const { createTask, getAllTasks, deleteTaskById, getTaskById, updateTaskById } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validationMiddleware');


const createTaskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().required(),
    status: Joi.string().valid('todo', 'in-progress', 'done').required(),
}).unknown(true)


router.post('/', protect, validateRequest(createTaskSchema), createTask)
router.get('/', protect, getAllTasks);
router.delete('/:id', protect, deleteTaskById)
router.get('/:id', protect, getTaskById);
router.put('/:id', protect, updateTaskById);


module.exports = router;
