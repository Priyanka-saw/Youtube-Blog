const {createHmac, randomBytes} = require('crypto');
const {Schema, model} = require('mongoose'); 

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt:{
        type: String,
        // required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: '/public/images/default.png'
    },
    role:{
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER', 
    }
}, {timestamps: true}
);

userSchema.pre('save', function(next) {
   const user = this;

   if (!user.isModified('password')) return;

//    secret key
   const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

        this.salt = salt;
        this.password = hashedPassword;
        next();

});

module.exports = model('User', userSchema);