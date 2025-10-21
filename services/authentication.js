const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'dev_secret_change_me';

function createTokenForUser(user) {
    const payload = {
        // include both _id and id for compatibility across the app
        _id: user._id ? user._id.toString() : undefined,
        id: user._id ? user._id.toString() : undefined,
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
