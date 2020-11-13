const mongoose = require('mongoose');

var UserSchema = mongoose.Schema(
    {
        firstName: { type: String, trim: true, required: true, index: true },
        lastName: { type: String, trim: true, required: true, default: '' },
        email: { type: String, trim: true, unique: true, required: true, index: true }
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);


module.exports = mongoose.model('User', UserSchema, 'Users');
