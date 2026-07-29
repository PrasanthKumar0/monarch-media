const Student = require('../models/Student');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');

const listStudents = asyncHandler(async (req, res) => {
  const { page, limit, stage, search } = req.query;
  const filter = {};
  if (stage) filter.stage = stage;

  let studentIds;
  if (search) {
    const users = await User.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    }).select('_id');
    filter.user = { $in: users.map((u) => u._id) };
  }

  const pager = paginate(Student, filter, {
    page,
    limit,
    populate: [
      { path: 'user', select: 'name email phone avatar' },
      { path: 'assignedCounselor', select: 'name email' },
      { path: 'preferredCountries', select: 'name slug flagEmoji' },
    ],
  });
  const result = await pager.exec(filter);
  res.json({ success: true, ...result });
});

const getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id)
    .populate('user', 'name email phone avatar')
    .populate('preferredCountries preferredCourses assignedCounselor');
  if (!student) throw new ApiError(404, 'Student not found');
  res.json({ success: true, data: student });
});

const getMyStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ user: req.user._id })
    .populate('preferredCountries preferredCourses assignedCounselor');
  if (!student) throw new ApiError(404, 'Student profile not found');
  res.json({ success: true, data: student });
});

const updateStudent = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin' || req.user.role === 'counselor';
  const filter = isAdmin ? { _id: req.params.id } : { user: req.user._id };

  const student = await Student.findOneAndUpdate(filter, req.body, {
    new: true,
    runValidators: true,
  }).populate('user', 'name email phone');

  if (!student) throw new ApiError(404, 'Student not found');
  res.json({ success: true, data: student });
});

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) throw new ApiError(404, 'Student not found');
  await User.findByIdAndDelete(student.user);
  res.json({ success: true, message: 'Student removed' });
});

module.exports = {
  listStudents,
  getStudent,
  getMyStudentProfile,
  updateStudent,
  deleteStudent,
};
