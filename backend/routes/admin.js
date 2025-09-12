const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.use(auth, auth.requireRole(['Admin']));

router.get('/users', adminController.listUsers);
router.patch('/users/:id/status', adminController.setUserStatus);
router.patch('/listings/:id/approve', adminController.approveListing);
router.patch('/listings/:id/reject', adminController.rejectListing);

module.exports = router;


