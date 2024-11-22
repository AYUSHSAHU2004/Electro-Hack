const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    problemDetail: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: String,
        required: true
    },
    publicCheck: {
        type: Boolean,
        required: true
    },
    authorityCheck: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('CompleteProblem', problemSchema);
