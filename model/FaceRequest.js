const mongoose = require('mongoose');

const FaceRequest = new mongoose.Schema({
    emotion: {
        type: String,
        enum: ['joy', 'neutral', 'surprise']
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    age: {
        type: String,
        enum: ['infant', 'child', 'young-adult', 'adult', 'elderly']
    },
    ethnicity: {
        type: String,
        enum: ['white', 'asian', 'latino', 'black']
    },
    eye_color: {
        type: String,
        enum: ['brown', 'blue', 'gray', 'green']
    },
    hair_color: {
        type: String,
        enum: ['brown', 'blond', 'black']
    },
    hair_length: {
        type: String,
        enum: ['short', 'medium', 'long']
    }
});

module.exports = mongoose.model('FaceRequest', FaceRequest);
