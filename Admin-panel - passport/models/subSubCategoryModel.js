const mongoose = require('mongoose');

const subSubCategorySchema = new mongoose.Schema({
    subSubCategory: { type: String, required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId, ref: 'subCategory', required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true
    }
});

const subSubCategoryModel = mongoose.model('subSubCategory', subSubCategorySchema);

module.exports = subSubCategoryModel