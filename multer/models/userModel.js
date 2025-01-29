const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;