const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { 
    type: String, required: true 
  },
  productPrice: { 
    type: Number, required: true 
  },
  productDescription: { 
    type: String, required: true 
  },
  productCategory: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true 
  },
  productSubCategory: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'subCategory', required: true 
  },
  productSubSubCategory: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'subSubCategory', required: true 
  },
  productContact: { 
    type: String, required: true 
  },
  productImage: { type: [String] }
});

const productModel = mongoose.model('product', productSchema);
module.exports = productModel;
