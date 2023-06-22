const operations = require('../../models/contacts');
const createError = require('http-errors');

const updateById = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await operations.updateContact(id, req.body);
  if (!updatedContact) throw createError(404, `Contact id=${id} not found`);
  res.json({ status: 'success', code: 200, data: { result: updatedContact } });
};

module.exports = updateById;
