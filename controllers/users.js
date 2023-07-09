const path = require('path');
const sharp = require('sharp');
const fs = require('fs/promises');

const { User } = require('../models/user');
const { HttpError } = require('../helpers');

// Get all users
const getAll = async (req, res) => {
  const result = await User.find();
  res.json({ status: 'success', code: 200, data: { result } });
};

// Get current user
const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({ name, email });
};

// Update subscription
const updateSubscriptionById = async (req, res) => {
  const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!result) throw HttpError(404, 'User not found');
  res.json({ status: 'success', code: 200, data: { result } });
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
    const result = await User.findByIdAndUpdate(req.user._id, { avatarUrl }, { new: true });
    if (!result) throw HttpError(404, 'User not found');
    res.json({ status: 'success', code: 200, data: { result } });
  } catch (error) {
    return error;
  }
};

module.exports = { getAll, getCurrent, updateSubscriptionById, updateAvatar };
