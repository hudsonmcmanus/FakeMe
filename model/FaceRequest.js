const mongoose = require('mongoose');

const FaceRequest = new mongoose.Schema({
    emotion: {
        type: String,
        enum : ['joy', 'neutral', 'surprise']
    },
    sex: {
        type: String,
    },
    age: {
        type: String,
        enum : ['infant', 'child', 'young-adult', 'adult', 'elderly']
    },
    ethnicity: {
        type: String,
        enum : ['white', 'asian', 'latino', 'black']
    },
    eye_color: {
        type: String,
        enum : ['brown', 'blue', 'gray', 'green']
    },
    hair_color: {
        type: String,
        enum : ['brown', 'blond', 'black', 'gray', 'red']
    },
    hair_length: {
        type: String,
        enum : ['short', 'medium', 'long']
    }
});

module.exports = mongoose.model('FaceRequest', FaceRequest);