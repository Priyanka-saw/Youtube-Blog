const { createHmac, randomBytes } = require('crypto');
const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: '/public/images/default.png',
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
}, { timestamps: true });

// Generate salt and hash password before validation so required fields exist
userSchema.pre('validate', function (next) {
    const user = this;

    if (!user.password) return next();
    if (!user.isNew && !user.isModified('password')) return next();

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

    user.salt = salt;
    user.password = hashedPassword;
    next();
});

// Verify password and return a signed JWT
userSchema.statics.matchPasswordAndGenerateToken = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User not found');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt)
        .update(password)
        .digest('hex');

    if (hashedPassword !== userProvidedHash) throw new Error('Invalid Password');

    return createTokenForUser(user);
};

function createTokenForUser(user) {
    const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
    
    // include both _id and id string properties for compatibility
    const _idStr = user._id ? user._id.toString() : (user.id ? user.id : undefined);
    const payload = { _id: _idStr, id: _idStr, email: user.email, fullname: user.fullname };
    return jwt.sign(payload, secret);
}

const User = model('User', userSchema);

module.exports = User;