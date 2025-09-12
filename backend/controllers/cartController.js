const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');
    res.json(cart || { user: req.user.userId, items: [] });
  } catch (err) { res.status(500).json({ error: err.message }) }
}

exports.replaceCart = async (req, res) => {
  try {
    const { items } = req.body;
    const sanitized = (Array.isArray(items) ? items : []).map(i => ({ product: i.product, quantity: Math.max(1, Number(i.quantity)||1) }))
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.userId },
      { items: sanitized, updatedAt: new Date() },
      { upsert: true, new: true }
    ).populate('items.product')
    res.json(cart)
  } catch (err) { res.status(400).json({ error: err.message }) }
}

exports.addItem = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) cart = new Cart({ user: req.user.userId, items: [] });
    const idx = cart.items.findIndex(i => String(i.product) === String(product));
    if (idx >= 0) cart.items[idx].quantity += Math.max(1, Number(quantity)||1);
    else cart.items.push({ product, quantity: Math.max(1, Number(quantity)||1) });
    cart.updatedAt = new Date();
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) { res.status(400).json({ error: err.message }) }
}

exports.updateItem = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    const idx = cart.items.findIndex(i => String(i.product) === String(product));
    if (idx < 0) return res.status(404).json({ error: 'Item not found' });
    cart.items[idx].quantity = Math.max(1, Number(quantity)||1);
    cart.updatedAt = new Date();
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) { res.status(400).json({ error: err.message }) }
}

exports.removeItem = async (req, res) => {
  try {
    const { product } = req.body;
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.items = cart.items.filter(i => String(i.product) !== String(product));
    cart.updatedAt = new Date();
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) { res.status(400).json({ error: err.message }) }
}


