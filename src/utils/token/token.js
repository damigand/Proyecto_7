const jwt = require('jsonwebtoken');

const generateToken = (id, username) => {
    return jwt.sign({ id, username }, process.env.TOKEN_KEY, { expiresIn: '1d' });
};

const validateToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_KEY);
};

module.exports = { generateToken, validateToken };
