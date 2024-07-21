const bcrypt = require('bcryptjs');

const users = [];

const registerUser = ({ name, email, password }) => {
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
        throw new Error('User already exists');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = { id: Date.now(), name, email, password: hashedPassword };
    users.push(user);
    return user;
};

const findUserByEmail = (email) => {
    return users.find((user) => user.email === email);
};

module.exports = { registerUser, findUserByEmail };
