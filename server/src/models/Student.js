const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    dateOfBirth: Date,
    nationality: { type: String, default: '' },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    education: [
      {
        level: String,
        institution: String,
        field: String,
        grade: String,
        year: Number,
      },
    ],
    preferredCountries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Country' }],
    preferredCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    documents: [
      {
        name: String,
        url: String,
        type: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    assignedCounselor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    stage: {
      type: String,
      enum: ['lead', 'counseling', 'application', 'visa', 'enrolled'],
      default: 'lead',
    },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
