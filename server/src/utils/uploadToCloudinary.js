const { cloudinary } = require('../config/cloudinary');
const fs = require('fs');

const uploadToCloudinary = async (filePath, folder = 'educonsult') => {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return { url: `/uploads/${filePath.split(/[/\\]/).pop()}`, publicId: null };
  }

  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: 'auto',
  });

  fs.unlink(filePath, () => {});
  return { url: result.secure_url, publicId: result.public_id };
};

module.exports = uploadToCloudinary;
