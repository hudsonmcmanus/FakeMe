const mongoose = require('mongoose');

const IdRequest = new mongoose.Schema({
    sex: {
        type: String,
    },
    age: {
        type: Number,
        min: 0,
        max: 150
    },
    country: {
        type: String,
        enum : [
            "australia", "austria", "belgium", "brazil", "canada",
            "cyprus", "czech_republic", "denmark", "estonia", "finland",
            "france", "germany", "greenland", "hungary", "iceland",
            "italy", "netherlands", "new_zealand", "norway", "poland",
            "portugal", "slovenia", "south_africa", "spain", "sweden",
            "switzerland", "tunisia", "united_kingdom", "united_states", "uruguay"]
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
