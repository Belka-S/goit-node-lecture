const operations = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await operations.getContact(id);
  if (!contact) throw HttpError(404, `Contact id=${id} not found`);
  res.json({ status: 'success', code: 200, data: { result: contact } });
};

module.exports = getById;
