const mongoose = require("mongoose");

const conn = async () => {
    await mongoose.connect("mongodb://localhost:27017/TestUser")
    console.log("DB Connected");
}

module.exports = conn;