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
        default: true // Default value set to true
    },
    authorityCheck: {
        type: Boolean,
        default: true // Default value set to true
    }
});

module.exports = mongoose.model('CompleteProblem', problemSchema);
