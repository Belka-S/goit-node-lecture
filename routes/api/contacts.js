const express = require('express');
const { nanoid } = require('nanoid');
const createError = require('http-errors');
const Joi = require('joi');

const operations = require('../../data');

const router = express.Router();
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

// GET
router.get('/', async (req, res, next) => {
  try {
    const contacts = await operations.listContacts();
    res.json({ status: 'success', code: 200, data: { result: contacts } });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await operations.getContact(id);
    if (!contact) throw createError(404, `Contact id=${id} not found`);
    // { const error = new Error(`Contact id=${id} not found`);
    // error.status = 404;
    // throw error; }
    res.json({ status: 'success', code: 200, data: { result: contact } });
  } catch (error) {
    next(error);
  }
});

// POST
router.post('/', async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  try {
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await operations.addContact(req.body);
    res.status(201).json({ status: 'success', code: 201, data: { result: newContact } });
  } catch (error) {
    next(error);
  }
});

// PUT
router.put('/:id', async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  try {
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    const updatedContact = await operations.updateContact(id, req.body);
    if (!updatedContact) throw createError(404, `Contact id=${id} not found`);
    res.json({ status: 'success', code: 200, data: { result: updatedContact } });
  } catch (error) {
    next(error);
  }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await operations.deleteContact(id);
    if (!deletedContact) throw createError(404, `Contact id=${id} not found`);
    res.json({ status: 'success', code: 200, data: { result: deletedContact } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
