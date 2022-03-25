const mongoose = require('mongoose');

// TODO: Add more strict schema reqs (e.g. enum)
const FaceRequest = new mongoose.Schema({
    emotion: {
        type: String,
    },
    sex: {
        type: String,
    },
    age: {
        type: String,
    },
    ethnicity: {
        type: String,
    },
    eye_color: {
        type: String,
    },
    hair_color: {
        type: String,
    },
    hair_length: {
        type: String,
    }
});

module.exports = mongoose.model('FaceRequest', FaceRequest);
