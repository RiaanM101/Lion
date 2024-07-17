const express = require('express');
const { addProduct, updateProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addProduct);
router.put('/:id', authMiddleware, updateProduct);

module.exports = router;
