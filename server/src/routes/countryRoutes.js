const express = require('express');
const {
  listCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} = require('../controllers/countryController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', listCountries);
router.get('/:id', getCountry);
router.post('/', protect, authorize('admin'), upload.single('image'), createCountry);
router.patch('/:id', protect, authorize('admin'), upload.single('image'), updateCountry);
router.delete('/:id', protect, authorize('admin'), deleteCountry);

module.exports = router;
