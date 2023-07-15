const path = require('path');
const sharp = require('sharp');
const fs = require('fs/promises');

const { User } = require('../models/user');
const { HttpError, sendEmail } = require('../helpers');

// Get all users
const getAll = async (req, res) => {
  const user = await User.find();
  res.json({ status: 'success', code: 200, data: { user } });
};

// Get current user
const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({ status: 'success', code: 200, data: { name, email } });
};

// Update subscription
const updateSubscriptionById = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) throw HttpError(404, 'User not found');
  res.json({ status: 'success', code: 200, data: { user } });
};

// Update avatar
const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${req.user._id}_${originalname}`;
  const resultUpload = path.join(__dirname, '..', 'public', 'avatars', fileName);

  try {
    await sharp(tempUpload).resize(200, 200, { fit: sharp.fit.cover }).toFile(resultUpload);
    await fs.unlink(tempUpload);
    const avatarUrl = path.join('public', 'avatars', fileName);
    const user = await User.findByIdAndUpdate(req.user._id, { avatarUrl }, { new: true });
    if (!user) throw HttpError(404, 'User not found');
    res.json({ status: 'success', code: 200, data: { user } });
  } catch (error) {
    return error;
  }
};

// Verify email
const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) throw HttpError(401, 'Email not verified');
  await User.findByIdAndUpdate(user._id, { verified: true, verificationCode: '' });
  res.json({ message: `Email ${user.email} verified` });
};

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, 'Email not found');
  if (user.verified) throw HttpError(401, 'Email already verified');
  await sendEmail(email, user.verificationCode);
  res.json({ message: `Email sent to ${email}` });
};

module.exports = {
  getAll,
  getCurrent,
  updateSubscriptionById,
  updateAvatar,
  verifyEmail,
  resendVerificationEmail,
};
