const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    subCategory: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
})

const subCategoryModel = mongoose.model('subCategory', subCategorySchema)

module.exports = subCategoryModel;