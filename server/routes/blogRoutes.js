const express = require('express');
const { addBlog, updateBlog } = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addBlog);
router.put('/:id', authMiddleware, updateBlog);

module.exports = router;
