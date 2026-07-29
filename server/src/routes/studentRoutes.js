const express = require('express');
const {
  listStudents,
  getStudent,
  getMyStudentProfile,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/me', protect, getMyStudentProfile);
router.patch('/me', protect, updateStudent);
router.get('/', protect, authorize('admin', 'counselor'), listStudents);
router.get('/:id', protect, authorize('admin', 'counselor'), getStudent);
router.patch('/:id', protect, authorize('admin', 'counselor'), updateStudent);
router.delete('/:id', protect, authorize('admin'), deleteStudent);

module.exports = router;
