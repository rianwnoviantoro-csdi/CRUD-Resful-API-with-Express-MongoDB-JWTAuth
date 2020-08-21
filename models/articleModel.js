const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    slug: {
        type: String,
    },
    releaseDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('article', articleSchema)