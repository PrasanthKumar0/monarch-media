const express = require('express');
const {
  listBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', listBlogs);
router.get('/:id', getBlog);
router.post('/', protect, authorize('admin'), upload.single('coverImage'), createBlog);
router.patch('/:id', protect, authorize('admin'), upload.single('coverImage'), updateBlog);
router.delete('/:id', protect, authorize('admin'), deleteBlog);

module.exports = router;
