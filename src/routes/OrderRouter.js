const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create', OrderController.createOrder);
router.get('/get-all-order/:id', OrderController.getAllOrderDetails);
router.get('/get-details-order/:id', OrderController.getDetailsOrder);
router.delete('/cancel-order/:id', OrderController.cancelDetailsOrder);
router.get('/get-all-order', authMiddleware, OrderController.getAllOrder);
router.post('/delete-many', authMiddleware, OrderController.deleteManyOrder);
router.delete('/delete-order/:id', authMiddleware, OrderController.deleteOrder);
router.put('/update-order/:id', OrderController.updateOrder);

module.exports = router;
