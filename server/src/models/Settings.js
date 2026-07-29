const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'EduPath Global' },
    tagline: { type: String, default: 'Your bridge to world-class education' },
    contactEmail: { type: String, default: 'hello@edupath.global' },
    contactPhone: { type: String, default: '+1 800 555 0199' },
    address: { type: String, default: '' },
    socialLinks: {
      facebook: String,
      instagram: String,
      linkedin: String,
      youtube: String,
      twitter: String,
    },
    hero: {
      title: String,
      subtitle: String,
      ctaPrimary: String,
      ctaSecondary: String,
    },
    stats: [
      {
        label: String,
        value: String,
      },
    ],
    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
