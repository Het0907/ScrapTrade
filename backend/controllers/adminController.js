const User = require('../models/User');
const Product = require('../models/Product');

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.setUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(id, { status }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.approveListing = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { approved: true }, { new: true });
    if (!product) return res.status(404).json({ error: 'Listing not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.rejectListing = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { approved: false }, { new: true });
    if (!product) return res.status(404).json({ error: 'Listing not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


