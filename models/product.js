const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  dateOfSale: Date,
  category: String,
  price: Number,
  productName: String,
  sold: Boolean
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
