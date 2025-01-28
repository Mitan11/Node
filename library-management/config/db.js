const mongoose = require('mongoose')

const conn = async () => {
    await mongoose.connect("mongodb://localhost:27017/Books");
    console.log("Database connected")
};

module.exports = conn;