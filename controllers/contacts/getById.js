const operations = require('../../models/contacts');
const createError = require('http-errors');

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await operations.getContact(id);
  if (!contact) throw createError(404, `Contact id=${id} not found`);
  res.json({ status: 'success', code: 200, data: { result: contact } });
};

module.exports = getById;
