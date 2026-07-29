const Blog = require('../models/Blog');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');
const uploadToCloudinary = require('../utils/uploadToCloudinary');

const listBlogs = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.user?.role !== 'admin') filter.isPublished = true;
  if (req.query.category) filter.category = req.query.category;
  if (req.query.tag) filter.tags = req.query.tag;
  if (req.query.search) {
    filter.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { excerpt: { $regex: req.query.search, $options: 'i' } },
    ];
  }

  const pager = paginate(Blog, filter, {
    page: req.query.page,
    limit: req.query.limit,
    populate: [{ path: 'author', select: 'name avatar' }],
  });
  const result = await pager.exec(filter);
  res.json({ success: true, ...result });
});

const getBlog = asyncHandler(async (req, res) => {
  const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
    ? { _id: req.params.id }
    : { slug: req.params.id };
  const blog = await Blog.findOne(query).populate('author', 'name avatar');
  if (!blog) throw new ApiError(404, 'Blog not found');
  if (!blog.isPublished && req.user?.role !== 'admin') {
    throw new ApiError(404, 'Blog not found');
  }
  res.json({ success: true, data: blog });
});

const createBlog = asyncHandler(async (req, res) => {
  const body = { ...req.body, author: req.user._id };
  if (req.file) {
    const up = await uploadToCloudinary(req.file.path, 'blogs');
    body.coverImage = up.url;
  }
  if (body.isPublished) body.publishedAt = new Date();
  const blog = await Blog.create(body);
  res.status(201).json({ success: true, data: blog });
});

const updateBlog = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (req.file) {
    const up = await uploadToCloudinary(req.file.path, 'blogs');
    body.coverImage = up.url;
  }
  if (body.isPublished === true || body.isPublished === 'true') {
    body.publishedAt = new Date();
  }
  const blog = await Blog.findByIdAndUpdate(req.params.id, body, { new: true });
  if (!blog) throw new ApiError(404, 'Blog not found');
  res.json({ success: true, data: blog });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) throw new ApiError(404, 'Blog not found');
  res.json({ success: true, message: 'Blog deleted' });
});

module.exports = { listBlogs, getBlog, createBlog, updateBlog, deleteBlog };
