const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    language: String,
    rating: Number,   
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel;
