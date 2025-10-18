const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'dev_secret_change_me';

function createTokenForUser(user) {
    const payload = {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
    };
    const token = jwt.sign(payload, secret);
    return token;
}

function validateToken(token) {
    const payload = jwt.verify(token, secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
};
