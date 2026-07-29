const express = require('express');
const {
  listCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', listCourses);
router.get('/:id', getCourse);
router.post('/', protect, authorize('admin'), upload.single('image'), createCourse);
router.patch('/:id', protect, authorize('admin'), upload.single('image'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

module.exports = router;
