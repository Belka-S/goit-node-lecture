const createError = require('http-errors');

const { Contact } = require('../models/contact');

// GET
const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.json({ status: 'success', code: 200, data: { result: contacts } });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) throw createError(404, `Contact id=${id} not found`);
  res.json({ status: 'success', code: 200, data: { result: contact } });
};

// POST
const add = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({ status: 'success', code: 201, data: { result: newContact } });
};

// PUT
const updateById = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedContact) throw createError(404, `Contact id=${id} not found`);
  res.json({ status: 'success', code: 200, data: { result: updatedContact } });
};

// PATCH
const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedContact) throw createError(404, `Contact id=${id} not found`);
  res.json({ status: 'success', code: 200, data: { result: updatedContact } });
};

// DELEETE
const removeById = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(id);
  if (!deletedContact) throw createError(404, `Contact id=${id} not found`);
  res.json({ status: 'success', code: 200, data: { result: deletedContact } });
};

module.exports = { getAll, getById, add, updateById, updateFavoriteById, removeById };
