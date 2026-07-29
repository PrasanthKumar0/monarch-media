require('dotenv').config();
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Country = require('./src/models/Country');
const University = require('./src/models/University');
const Course = require('./src/models/Course');
const Blog = require('./src/models/Blog');
const Review = require('./src/models/Review');
const Settings = require('./src/models/Settings');

const seed = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany({ email: { $in: ['admin@edupath.global', 'demo@student.com'] } }),
    Country.deleteMany({}),
    University.deleteMany({}),
    Course.deleteMany({}),
    Blog.deleteMany({}),
    Review.deleteMany({}),
  ]);

  const admin = await User.create({
    name: 'Platform Admin',
    email: 'admin@edupath.global',
    password: 'Admin@12345',
    role: 'admin',
  });

  await User.create({
    name: 'Demo Student',
    email: 'demo@student.com',
    password: 'Student@123',
    role: 'student',
  });

  const countries = await Country.insertMany([
    {
      name: 'United Kingdom',
      code: 'GB',
      flagEmoji: '🇬🇧',
      description: 'Home to centuries of academic excellence and globally ranked institutions.',
      highlights: ['Post-study work visa', '1-year masters programs', 'Multicultural cities'],
      avgTuition: 18000,
      currency: 'GBP',
      isFeatured: true,
      popularCities: ['London', 'Manchester', 'Edinburgh'],
    },
    {
      name: 'Canada',
      code: 'CA',
      flagEmoji: '🇨🇦',
      description: 'Quality education with pathways to permanent residency.',
      highlights: ['PGWP eligible', 'Safe campuses', 'Co-op programs'],
      avgTuition: 22000,
      currency: 'CAD',
      isFeatured: true,
      popularCities: ['Toronto', 'Vancouver', 'Montreal'],
    },
    {
      name: 'Australia',
      code: 'AU',
      flagEmoji: '🇦🇺',
      description: 'Innovative research hubs and vibrant student life.',
      highlights: ['Strong research funding', 'Work while studying', 'Sunshine lifestyle'],
      avgTuition: 28000,
      currency: 'AUD',
      isFeatured: true,
      popularCities: ['Melbourne', 'Sydney', 'Brisbane'],
    },
    {
      name: 'Germany',
      code: 'DE',
      flagEmoji: '🇩🇪',
      description: 'Engineering powerhouse with affordable public universities.',
      highlights: ['Low tuition fees', 'Industry partnerships', 'EU mobility'],
      avgTuition: 5000,
      currency: 'EUR',
      isFeatured: true,
      popularCities: ['Berlin', 'Munich', 'Hamburg'],
    },
  ]);

  const uk = countries[0];
  const canada = countries[1];

  const universities = await University.insertMany([
    {
      name: 'Northbridge Institute of Technology',
      country: uk._id,
      city: 'London',
      ranking: 42,
      description: 'A forward-thinking institute blending technology, design, and business.',
      highlights: ['Industry placements', 'Modern labs', 'Global alumni network'],
      tuitionRange: { min: 14000, max: 22000, currency: 'GBP' },
      intakes: ['September', 'January'],
      isFeatured: true,
    },
    {
      name: 'Pacific Crest University',
      country: canada._id,
      city: 'Vancouver',
      ranking: 58,
      description: 'Research-led university known for sustainability and health sciences.',
      highlights: ['Co-op terms', 'Scholarships available', 'Coastal campus'],
      tuitionRange: { min: 18000, max: 26000, currency: 'CAD' },
      intakes: ['September', 'May'],
      isFeatured: true,
    },
  ]);

  await Course.insertMany([
    {
      title: 'MSc Artificial Intelligence & Data Science',
      university: universities[0]._id,
      country: uk._id,
      level: 'master',
      duration: '12 months',
      tuitionFee: 19500,
      currency: 'GBP',
      description: 'Build production-grade ML systems with ethics and governance at the core.',
      requirements: ['Bachelor in CS or related field', 'IELTS 6.5', 'Statement of purpose'],
      isFeatured: true,
    },
    {
      title: 'BBA Global Business Management',
      university: universities[1]._id,
      country: canada._id,
      level: 'bachelor',
      duration: '4 years',
      tuitionFee: 21000,
      currency: 'CAD',
      description: 'International business curriculum with mandatory co-op experience.',
      requirements: ['High school diploma', 'IELTS 6.0', 'Math prerequisite'],
      isFeatured: true,
    },
  ]);

  await Blog.create({
    title: 'How to Build a Winning Study Abroad Application in 2026',
    excerpt: 'A counselor-approved checklist for documents, timelines, and storytelling.',
    content:
      '<p>Start early, align your goals with program outcomes, and treat each essay as evidence of fit—not a biography recap.</p>',
    author: admin._id,
    tags: ['applications', 'planning'],
    category: 'Guides',
    isPublished: true,
    publishedAt: new Date(),
  });

  await Review.insertMany([
    {
      name: 'Aisha Rahman',
      role: 'Graduate Student',
      rating: 5,
      content:
        'EduPath mapped my profile to programs I had never considered. I received an offer within eight weeks.',
      destination: 'United Kingdom',
      isFeatured: true,
    },
    {
      name: 'Marcus Chen',
      role: 'MBA Candidate',
      rating: 5,
      content: 'Transparent process, weekly milestones, and visa guidance that actually made sense.',
      destination: 'Canada',
      isFeatured: true,
    },
  ]);

  await Settings.create({
    siteName: 'EduPath Global',
    tagline: 'Navigate your future with clarity and confidence',
    hero: {
      title: 'Study abroad with a team that treats your ambition seriously',
      subtitle: 'Personalized counseling, curated universities, and end-to-end application support.',
      ctaPrimary: 'Book free consultation',
      ctaSecondary: 'Explore destinations',
    },
    stats: [
      { label: 'Partner universities', value: '120+' },
      { label: 'Countries covered', value: '18' },
      { label: 'Visa success rate', value: '96%' },
      { label: 'Students counseled', value: '4,500+' },
    ],
  });

  console.log('Seed complete.');
  console.log('Admin: admin@edupath.global / Admin@12345');
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
