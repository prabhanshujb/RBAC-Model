const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');

const ProductController = require('../controllers/productController');

router.post('/', auth, ProductController.createProduct);

module.exports = router; 