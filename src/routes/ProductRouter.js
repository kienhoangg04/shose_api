const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create', productController.createProduct);
router.put('/update/:id', authMiddleware, productController.updateProduct);
router.delete('/delete/:id', authMiddleware, productController.deleteProduct);
router.post('/delete-many', authMiddleware, productController.deleteManyProduct);
router.get('/get-all', productController.getAllProduct);
router.get('/get-details/:id', productController.getDetailsProduct);
router.get('/get-all-type', productController.getAllType);
router.get('/get-product-home', productController.getProductHome);

module.exports = router;
