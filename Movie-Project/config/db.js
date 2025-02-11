const mongoose = require('mongoose');
const connection = async () => {
    await mongoose.connect('mongodb://localhost:27017/movie-project');
    console.log('Connected to MongoDB');
}

module.exports = connection;

