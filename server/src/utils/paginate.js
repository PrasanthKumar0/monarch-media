const paginate = (Model, query = {}, options = {}) => {
  const page = Math.max(1, parseInt(options.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(options.limit, 10) || 12));
  const skip = (page - 1) * limit;
  const sort = options.sort || '-createdAt';

  return {
    page,
    limit,
    skip,
    sort,
    async exec(filter = query) {
      const [data, total] = await Promise.all([
        Model.find(filter).sort(sort).skip(skip).limit(limit).populate(options.populate || []),
        Model.countDocuments(filter),
      ]);
      return {
        data,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit) || 1,
        },
      };
    },
  };
};

module.exports = paginate;
