const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    subCategory: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
})

const subCategoryModel = mongoose.model('SubCategory', subCategorySchema)

module.exports = subCategoryModel;