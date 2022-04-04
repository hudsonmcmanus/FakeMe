const mongoose = require('mongoose');

const FaceCollection = new mongoose.Schema({
    owner_token: {
        type: String,
        required: true
    },
    faces: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('FaceCollection', FaceCollection);
