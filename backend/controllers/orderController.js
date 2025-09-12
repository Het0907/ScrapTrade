const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.checkout = async (req, res) => {
  try {
    // Load user's cart
    const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    // Build order items snapshot
    const items = cart.items.map(i => ({
      productId: i.product?._id || i.product,
      name: i.product?.name || '',
      price: i.product?.price || 0,
      quantity: i.quantity,
      images: i.product?.images || [],
    }))
    const total = items.reduce((acc, it) => acc + (it.price || 0) * (it.quantity || 1), 0)

    // Estimated delivery = 5 days from now
    const estimated = new Date(Date.now() + 5*24*60*60*1000)

    const order = new Order({ user: req.user.userId, items, total, estimatedDelivery: estimated })
    await order.save()

    // Remove products from catalogue
    const productIds = items.map(i => i.productId).filter(Boolean)
    if (productIds.length) {
      await Product.deleteMany({ _id: { $in: productIds } })
    }

    // Clear cart
    cart.items = []
    await cart.save()

    res.json({ orderId: order._id, estimatedDelivery: estimated })
  } catch (err) { res.status(500).json({ error: err.message }) }
}


