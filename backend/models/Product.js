const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [{ type: String }],
  quantity: { type: Number, default: 1 },
  category: { type: String },
  location: { type: String },
  condition: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
  createdAt: { type: Date, default: Date.now },
  approved: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', ProductSchema);
