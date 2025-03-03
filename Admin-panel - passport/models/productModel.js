const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true, trim: true },
  productPrice: { type: Number, required: true, min: 0 },
  productDescription: { type: String, required: true },
  productSubSubCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubSubCategory', required: true },
  productContact: { type: String, required: true },
  productImage: { type: String } 
}, { timestamps: true });

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
