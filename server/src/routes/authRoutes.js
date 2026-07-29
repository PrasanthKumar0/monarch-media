const express = require('express');
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  listUsers,
  updateUserRole,
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.patch('/profile', protect, updateProfile);
router.patch('/password', protect, changePassword);
router.get('/users', protect, authorize('admin'), listUsers);
router.patch('/users/:id/role', protect, authorize('admin'), updateUserRole);

module.exports = router;
