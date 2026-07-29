const express = require('express');
const {
  listReviews,
  createReview,
  updateReview,
  deleteReview,
  listGallery,
  createGalleryItem,
  deleteGalleryItem,
  getSettings,
  updateSettings,
  getDashboardStats,
} = require('../controllers/miscController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/reviews', listReviews);
router.post('/reviews', protect, authorize('admin'), createReview);
router.patch('/reviews/:id', protect, authorize('admin'), updateReview);
router.delete('/reviews/:id', protect, authorize('admin'), deleteReview);

router.get('/gallery', listGallery);
router.post('/gallery', protect, authorize('admin'), upload.single('image'), createGalleryItem);
router.delete('/gallery/:id', protect, authorize('admin'), deleteGalleryItem);

router.get('/settings', getSettings);
router.patch('/settings', protect, authorize('admin'), updateSettings);
router.get('/dashboard/stats', protect, authorize('admin', 'counselor'), getDashboardStats);

module.exports = router;
