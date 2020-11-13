const mongoose = require('mongoose');

var ChatSchema = mongoose.Schema(
    {
        to: { type: String, trim: true, required: true},
        message: { type: String, trim: true, required: true, default: '' },
        from: { type: String, trim: true, unique: true, required: true }
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);
module.exports = mongoose.model('Chat', ChatSchema, 'Chats');
