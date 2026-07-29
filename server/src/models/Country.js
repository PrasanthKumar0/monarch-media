const mongoose = require('mongoose');

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const countrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, index: true },
    code: { type: String, uppercase: true, maxlength: 3 },
    flagEmoji: { type: String, default: '' },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    highlights: [String],
    avgTuition: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    visaInfo: { type: String, default: '' },
    popularCities: [String],
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

countrySchema.pre('validate', function setSlug(next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = slugify(this.name);
  }
  next();
});

module.exports = mongoose.model('Country', countrySchema);
