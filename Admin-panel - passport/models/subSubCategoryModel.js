const mongoose = require('mongoose');

const subSubCategorySchema = new mongoose.Schema({
    subSubCategory: { type: String, required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true }
})

const subSubCategoryModel = mongoose.model('SubSubCategory', subSubCategorySchema);

module.exports = subSubCategoryModel