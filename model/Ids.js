const mongoose = require('mongoose');

const IdCollection = new mongoose.Schema({
    owner_token: {
        type: String,
        required: true
    },
    id: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('IdCollection', IdCollection);
