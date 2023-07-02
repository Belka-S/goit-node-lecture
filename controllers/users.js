const { User } = require('../models/user');
const { HttpError } = require('../helpers');

// GET
const getAll = async (req, res) => {
  const result = await User.find();
  res.json({ status: 'success', code: 200, data: { result } });
};

// PATCH
const updateSubscriptionById = async (req, res) => {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) throw HttpError(404, 'User not found');
  res.json({ status: 'success', code: 200, data: { result } });
};

module.exports = { getAll, updateSubscriptionById };
