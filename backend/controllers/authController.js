const bcrypt = require('bcryptjs');
const generateToken = require('../config');
const { registerUser, findUserByEmail } = require('../models/userModel');

const register = (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = registerUser({ name, email, password });
        return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

const login = (req, res) => {
    const { email, password } = req.body;
    const user = findUserByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
};

module.exports = { register, login };
