const University = require('../models/University');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');
const uploadToCloudinary = require('../utils/uploadToCloudinary');

const buildFilter = (query) => {
  const filter = {};
  if (query.country) filter.country = query.country;
  if (query.featured === 'true') filter.isFeatured = true;
  if (query.published !== 'false') filter.isPublished = true;
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { city: { $regex: query.search, $options: 'i' } },
    ];
  }
  return filter;
};

const listUniversities = asyncHandler(async (req, res) => {
  const filter = buildFilter(req.query);
  const pager = paginate(University, filter, {
    page: req.query.page,
    limit: req.query.limit,
    populate: [{ path: 'country', select: 'name slug flagEmoji code' }],
  });
  const result = await pager.exec(filter);
  res.json({ success: true, ...result });
});

const getUniversity = asyncHandler(async (req, res) => {
  const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
    ? { _id: req.params.id }
    : { slug: req.params.id };

  const university = await University.findOne(query).populate('country');
  if (!university) throw new ApiError(404, 'University not found');
  res.json({ success: true, data: university });
});

const createUniversity = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (req.files?.logo?.[0]) {
    const up = await uploadToCloudinary(req.files.logo[0].path, 'universities');
    body.logo = up.url;
  }
  if (req.files?.coverImage?.[0]) {
    const up = await uploadToCloudinary(req.files.coverImage[0].path, 'universities');
    body.coverImage = up.url;
  }
  if (body.highlights && typeof body.highlights === 'string') {
    body.highlights = JSON.parse(body.highlights);
  }
  if (body.tuitionRange && typeof body.tuitionRange === 'string') {
    body.tuitionRange = JSON.parse(body.tuitionRange);
  }

  const university = await University.create(body);
  res.status(201).json({ success: true, data: university });
});

const updateUniversity = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (req.files?.logo?.[0]) {
    const up = await uploadToCloudinary(req.files.logo[0].path, 'universities');
    body.logo = up.url;
  }
  if (req.files?.coverImage?.[0]) {
    const up = await uploadToCloudinary(req.files.coverImage[0].path, 'universities');
    body.coverImage = up.url;
  }

  const university = await University.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });
  if (!university) throw new ApiError(404, 'University not found');
  res.json({ success: true, data: university });
});

const deleteUniversity = asyncHandler(async (req, res) => {
  const university = await University.findByIdAndDelete(req.params.id);
  if (!university) throw new ApiError(404, 'University not found');
  res.json({ success: true, message: 'University deleted' });
});

module.exports = {
  listUniversities,
  getUniversity,
  createUniversity,
  updateUniversity,
  deleteUniversity,
};
