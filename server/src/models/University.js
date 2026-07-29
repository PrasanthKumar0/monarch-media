const mongoose = require('mongoose');

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const universitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
    city: { type: String, default: '' },
    logo: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    ranking: { type: Number, default: null },
    website: { type: String, default: '' },
    description: { type: String, default: '' },
    highlights: [String],
    tuitionRange: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'USD' },
    },
    intakes: [String],
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

universitySchema.pre('validate', function setSlug(next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = slugify(this.name);
  }
  next();
});

module.exports = mongoose.model('University', universitySchema);
