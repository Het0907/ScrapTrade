const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.use(auth);
router.get('/', cartController.getCart);
router.put('/', cartController.replaceCart);
router.post('/item', cartController.addItem);
router.patch('/item', cartController.updateItem);
router.delete('/item', cartController.removeItem);

module.exports = router;


