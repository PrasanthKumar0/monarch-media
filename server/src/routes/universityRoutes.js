const express = require('express');
const {
  listUniversities,
  getUniversity,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} = require('../controllers/universityController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', listUniversities);
router.get('/:id', getUniversity);
router.post(
  '/',
  protect,
  authorize('admin'),
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  createUniversity
);
router.patch(
  '/:id',
  protect,
  authorize('admin'),
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  updateUniversity
);
router.delete('/:id', protect, authorize('admin'), deleteUniversity);

module.exports = router;
