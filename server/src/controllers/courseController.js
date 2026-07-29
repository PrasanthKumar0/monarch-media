const Course = require('../models/Course');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');
const uploadToCloudinary = require('../utils/uploadToCloudinary');

const buildFilter = (query) => {
  const filter = {};
  if (query.country) filter.country = query.country;
  if (query.university) filter.university = query.university;
  if (query.level) filter.level = query.level;
  if (query.featured === 'true') filter.isFeatured = true;
  if (query.published !== 'false') filter.isPublished = true;
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
    ];
  }
  return filter;
};

const listCourses = asyncHandler(async (req, res) => {
  const filter = buildFilter(req.query);
  const pager = paginate(Course, filter, {
    page: req.query.page,
    limit: req.query.limit,
    populate: [
      { path: 'university', select: 'name slug logo city' },
      { path: 'country', select: 'name slug flagEmoji' },
    ],
  });
  const result = await pager.exec(filter);
  res.json({ success: true, ...result });
});

const getCourse = asyncHandler(async (req, res) => {
  const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
    ? { _id: req.params.id }
    : { slug: req.params.id };
  const course = await Course.findOne(query).populate('university country');
  if (!course) throw new ApiError(404, 'Course not found');
  res.json({ success: true, data: course });
});

const createCourse = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (req.file) {
    const up = await uploadToCloudinary(req.file.path, 'courses');
    body.image = up.url;
  }
  const course = await Course.create(body);
  res.status(201).json({ success: true, data: course });
});

const updateCourse = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (req.file) {
    const up = await uploadToCloudinary(req.file.path, 'courses');
    body.image = up.url;
  }
  const course = await Course.findByIdAndUpdate(req.params.id, body, { new: true });
  if (!course) throw new ApiError(404, 'Course not found');
  res.json({ success: true, data: course });
});

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) throw new ApiError(404, 'Course not found');
  res.json({ success: true, message: 'Course deleted' });
});

module.exports = { listCourses, getCourse, createCourse, updateCourse, deleteCourse };
