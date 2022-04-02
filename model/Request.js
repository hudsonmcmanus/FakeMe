const mongoose = require('mongoose');

const RequestCollection = new mongoose.Schema({
    request_type: {
        type: String,
        required: true
    },
    request: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('RequestCollection', RequestCollection);
