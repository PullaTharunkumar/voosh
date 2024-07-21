const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validationMiddleware');

const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});


router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

module.exports = router;
