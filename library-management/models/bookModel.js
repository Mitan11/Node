const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    status: { type: String, required: true },
    condition: { type: String, required: true },
    description: { type: String, required: true },
    dateAdded: { type: Date, required: true }
})

booModel = mongoose.model("Books", bookSchema)

module.exports = booModel;