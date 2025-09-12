const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

router.get('/', categoryController.list);
router.post('/', auth, auth.requireRole(['Admin']), categoryController.create);
router.put('/:id', auth, auth.requireRole(['Admin']), categoryController.update);
router.delete('/:id', auth, auth.requireRole(['Admin']), categoryController.remove);

module.exports = router;


