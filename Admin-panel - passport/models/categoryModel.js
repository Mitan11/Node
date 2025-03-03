const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true, unique: true }
});

// Model name: 'Category'
const Category = mongoose.model('Category', categorySchema);
module.exports = Category; // Export as "Category"