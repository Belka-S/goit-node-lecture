const operations = require('../../models/contacts');

const add = async (req, res) => {
  const newContact = await operations.addContact(req.body);
  res.status(201).json({ status: 'success', code: 201, data: { result: newContact } });
};

module.exports = add;
