const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, 'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1' , {
        expiresIn: '30d',
    });
};

module.exports = generateToken;
