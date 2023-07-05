const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: { type: String, required: true, minlength: 3, maxlength: 20 },
        email: { type: String, required: true, minlength: 3, maxlength: 50 },
        password: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 1024,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', UserSchema);
