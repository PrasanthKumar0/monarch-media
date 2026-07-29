const Country = require('../models/Country');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');
const uploadToCloudinary = require('../utils/uploadToCloudinary');

const buildFilter = (query) => {
  const filter = {};
  if (query.featured === 'true') filter.isFeatured = true;
  if (query.published !== 'false') filter.isPublished = true;
  if (query.search) filter.name = { $regex: query.search, $options: 'i' };
  return filter;
};

const listCountries = asyncHandler(async (req, res) => {
  const filter = buildFilter(req.query);
  const pager = paginate(Country, filter, { page: req.query.page, limit: req.query.limit });
  const result = await pager.exec(filter);
  res.json({ success: true, ...result });
});

const getCountry = asyncHandler(async (req, res) => {
  const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
    ? { _id: req.params.id }
    : { slug: req.params.id };
  const country = await Country.findOne(query);
  if (!country) throw new ApiError(404, 'Country not found');
  res.json({ success: true, data: country });
});

const createCountry = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (req.file) {
    const up = await uploadToCloudinary(req.file.path, 'countries');
    body.image = up.url;
  }
  const country = await Country.create(body);
  res.status(201).json({ success: true, data: country });
});

const updateCountry = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (req.file) {
    const up = await uploadToCloudinary(req.file.path, 'countries');
    body.image = up.url;
  }
  const country = await Country.findByIdAndUpdate(req.params.id, body, { new: true });
  if (!country) throw new ApiError(404, 'Country not found');
  res.json({ success: true, data: country });
});

const deleteCountry = asyncHandler(async (req, res) => {
  const country = await Country.findByIdAndDelete(req.params.id);
  if (!country) throw new ApiError(404, 'Country not found');
  res.json({ success: true, message: 'Country deleted' });
});

module.exports = { listCountries, getCountry, createCountry, updateCountry, deleteCountry };
