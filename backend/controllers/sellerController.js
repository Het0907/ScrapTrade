const Seller = require('../models/Seller');
const Product = require('../models/Product');

exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().populate('listings');
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSeller = async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.status(201).json(seller);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id).populate('listings');
    if (!seller) return res.status(404).json({ error: 'Seller not found' });
    res.json(seller);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSeller = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!seller) return res.status(404).json({ error: 'Seller not found' });
    res.json(seller);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSeller = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (!seller) return res.status(404).json({ error: 'Seller not found' });
    res.json({ message: 'Seller deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
