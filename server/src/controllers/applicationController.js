const Application = require('../models/Application');
const Student = require('../models/Student');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

const listApplications = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.user.role === 'student') {
    filter.user = req.user._id;
  }
  if (req.query.status) filter.status = req.query.status;

  const applications = await Application.find(filter)
    .populate('university course student user')
    .sort('-createdAt');

  res.json({ success: true, data: applications });
});

const createApplication = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ user: req.user._id });
  if (!student) throw new ApiError(404, 'Complete your student profile first');

  const application = await Application.create({
    ...req.body,
    student: student._id,
    user: req.user._id,
    status: 'submitted',
    submittedAt: new Date(),
  });

  res.status(201).json({ success: true, data: application });
});

const updateApplication = asyncHandler(async (req, res) => {
  const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!application) throw new ApiError(404, 'Application not found');
  res.json({ success: true, data: application });
});

const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findByIdAndDelete(req.params.id);
  if (!application) throw new ApiError(404, 'Application not found');
  res.json({ success: true, message: 'Application removed' });
});

module.exports = { listApplications, createApplication, updateApplication, deleteApplication };
