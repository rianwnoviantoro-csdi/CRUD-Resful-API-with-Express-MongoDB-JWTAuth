const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        max: 255
    },
    lname: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 100
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('account', accountSchema)