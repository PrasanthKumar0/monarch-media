const Review = require('../models/Review');
const Gallery = require('../models/Gallery');
const Settings = require('../models/Settings');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const uploadToCloudinary = require('../utils/uploadToCloudinary');

const listReviews = asyncHandler(async (req, res) => {
  const filter = req.user?.role === 'admin' ? {} : { isPublished: true };
  const reviews = await Review.find(filter).sort('-createdAt');
  res.json({ success: true, data: reviews });
});

const createReview = asyncHandler(async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json({ success: true, data: review });
});

const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!review) throw new ApiError(404, 'Review not found');
  res.json({ success: true, data: review });
});

const deleteReview = asyncHandler(async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Review deleted' });
});

const listGallery = asyncHandler(async (req, res) => {
  const filter = req.user?.role === 'admin' ? {} : { isPublished: true };
  const items = await Gallery.find(filter).sort('order');
  res.json({ success: true, data: items });
});

const createGalleryItem = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (req.file) {
    const up = await uploadToCloudinary(req.file.path, 'gallery');
    body.imageUrl = up.url;
  }
  const item = await Gallery.create(body);
  res.status(201).json({ success: true, data: item });
});

const deleteGalleryItem = asyncHandler(async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Gallery item deleted' });
});

const getSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  res.json({ success: true, data: settings });
});

const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create(req.body);
  else {
    Object.assign(settings, req.body);
    await settings.save();
  }
  res.json({ success: true, data: settings });
});

const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    students,
    universities,
    courses,
    applications,
    contacts,
    blogs,
  ] = await Promise.all([
    require('../models/Student').countDocuments(),
    require('../models/University').countDocuments(),
    require('../models/Course').countDocuments(),
    require('../models/Application').countDocuments(),
    Contact.countDocuments({ status: 'new' }),
    require('../models/Blog').countDocuments({ isPublished: true }),
  ]);

  res.json({
    success: true,
    data: { students, universities, courses, applications, newContacts: contacts, blogs },
  });
});

module.exports = {
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
};
