const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    intake: { type: String, default: '' },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'under_review', 'offer', 'rejected', 'withdrawn'],
      default: 'draft',
    },
    documents: [
      {
        name: String,
        url: String,
        verified: { type: Boolean, default: false },
      },
    ],
    counselorNotes: { type: String, default: '' },
    submittedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
