const mongoose = require('mongoose');

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
    level: {
      type: String,
      enum: ['certificate', 'diploma', 'bachelor', 'master', 'phd', 'mba'],
      required: true,
    },
    duration: { type: String, default: '' },
    tuitionFee: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    language: { type: String, default: 'English' },
    description: { type: String, default: '' },
    requirements: [String],
    careerOutcomes: [String],
    image: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

courseSchema.pre('validate', function setSlug(next) {
  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = slugify(this.title);
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema);
