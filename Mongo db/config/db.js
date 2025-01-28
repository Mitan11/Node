const mongoose = require('mongoose');

const container = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/userData");
        console.log("Database Connected");
    } catch (error) {
        console.error("Database Connection Failed", error);
    }
}

module.exports = container;