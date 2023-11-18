const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        username: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: Number },
        dateOfBirth: { type: Date },
        address: { type: String },
        avatar: { type: String },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
