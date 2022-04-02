const mongoose = require('mongoose');

const IdRequest = new mongoose.Schema({
    sex: {
        type: String,
        enum : ['male', 'female']
    },
    age: {
        type: Number,
        min: 0,
        max: 150
    },
    country: {
        type: String,
        enum : [
            "usa", "canada", "russia", "ukraine", 
            "poland", "netherlands", "sweden", "china"
        ]
    },
    eye_color: {
        type: String,
        enum : ['brown', 'blue', 'gray', 'green']
    },
    hair_color: {
        type: String,
        enum : ['brown', 'blond', 'black', 'gray', 'red']
    },
    ethnicity: {
        type: String,
        enum : ['white', 'asian', 'latino', 'black']
    }
});

module.exports = mongoose.model('IdRequest', IdRequest);
