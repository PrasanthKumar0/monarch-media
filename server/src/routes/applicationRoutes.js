const express = require('express');
const {
  listApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, listApplications);
router.post('/', protect, createApplication);
router.patch('/:id', protect, authorize('admin', 'counselor'), updateApplication);
router.delete('/:id', protect, authorize('admin'), deleteApplication);

module.exports = router;
