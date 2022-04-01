const mongoose = require('mongoose');

const RequestCount = new mongoose.Schema({
    request: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('RequestCount', RequestCount);
