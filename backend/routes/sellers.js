const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', sellerController.getAllSellers);
router.get('/:id', sellerController.getSellerById);

// Protected routes (require authentication)
router.post('/', auth, sellerController.createSeller);
router.put('/:id', auth, sellerController.updateSeller);
router.delete('/:id', auth, sellerController.deleteSeller);

module.exports = router;
