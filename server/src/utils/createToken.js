const jwt = require('jsonwebtoken');
// require('dotenv').config()

function createToken(_id) {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ _id }, secretKey, { expiresIn: '7d' });

    return token;
}

module.exports = createToken;
