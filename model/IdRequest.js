const mongoose = require('mongoose');

// TODO: Add more strict schema reqs (e.g. enum)
const IdRequest = new mongoose.Schema({
    sex: {
        type: String,
    },
    country: {
        type: String,
    },
    eye_color: {
        type: String,
    },
    hair_color: {
        type: String,
    },
    ethnicity: {
        type: String,
    }
});

module.exports = mongoose.model('IdRequest', IdRequest);
