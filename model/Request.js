const mongoose = require('mongoose');

const RequestCollection = new mongoose.Schema({
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
