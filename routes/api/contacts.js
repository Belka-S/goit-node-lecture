const express = require('express');
const { nanoid } = require('nanoid');

const router = express.Router();
const contacts = require('../../data/contacts.json');

// GET
router.get('/', (req, res) => {
  res.json({ status: 'success', code: 200, data: { result: contacts } });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const contact = contacts.find(el => el.id === id);
  if (!contact) {
    res.status(404).json({ status: 'error', code: 404, message: `Contact id=${id} not found` });
  } else {
    res.json({ status: 'success', code: 200, data: { result: contact } });
  }
});

// POST
router.post('/', (req, res) => {
  const newContact = { id: nanoid(), ...req.body };
  contacts.push(newContact);
  res.status(201).json({ status: 'success', code: 201, data: { result: newContact } });
});

// PUT
router.put('/:id', (req, res) => {
  const index = contacts.findIndex(el => el.id === req.params.id);
  const oldContact = contacts.splice(index, 1, req.body);
  res.status(201).json({ status: 'success', code: 201, data: { result: oldContact } });
});

// DELETE
router.delete('/:id', (req, res) => {
  const index = contacts.findIndex(el => el.id === req.params.id);
  const deletedContact = contacts.splice(index, 1);
  res.json({ status: 'success', code: 200, data: { result: deletedContact } });
});

module.exports = router;
