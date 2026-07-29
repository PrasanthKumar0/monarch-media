const Contact = require('../models/Contact');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const sendEmail = require('../utils/sendEmail');

const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    throw new ApiError(400, 'Name, email, and message are required');
  }

  const contact = await Contact.create({ name, email, phone, subject, message });

  await sendEmail({
    to: process.env.ADMIN_EMAIL || process.env.SMTP_USER || email,
    subject: `[EduPath] ${subject || 'New inquiry'}`,
    text: `From: ${name} (${email})\n\n${message}`,
    html: `<p><strong>${name}</strong> (${email})</p><p>${message}</p>`,
  });

  res.status(201).json({ success: true, data: contact, message: 'Message sent successfully' });
});

const listContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort('-createdAt');
  res.json({ success: true, data: contacts });
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!contact) throw new ApiError(404, 'Contact not found');
  res.json({ success: true, data: contact });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) throw new ApiError(404, 'Contact not found');
  res.json({ success: true, message: 'Contact deleted' });
});

module.exports = { submitContact, listContacts, updateContact, deleteContact };
