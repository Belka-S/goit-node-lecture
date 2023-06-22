const operations = require('../../models/contacts');
const createError = require('http-errors');

const removeById = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await operations.deleteContact(id);
  if (!deletedContact) throw createError(404, `Contact id=${id} not found`);
  res.json({ status: 'success', code: 200, data: { result: deletedContact } });
};

module.exports = removeById;
