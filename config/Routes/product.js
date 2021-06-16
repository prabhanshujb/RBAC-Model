const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');

const ProductController = require('../controllers/productController');

router.post('/', auth, ProductController.createProduct);

router.get('/', auth, ProductController.product_get);

router.patch('/:productId', auth, ProductController.productUpdate);


module.exports = router; 