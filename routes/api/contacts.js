const express = require('express');

const { validation, ctrlWrapper } = require('../../middlewares');
const { contactsSchema } = require('../../schemas');
const { contacts } = require('../../controllers');

const router = express.Router();

// GET
router.get('/', ctrlWrapper(contacts.getAll));
router.get('/:id', ctrlWrapper(contacts.getById));

// POST
router.post('/', validation(contactsSchema), ctrlWrapper(contacts.add));

// PUT
router.put('/:id', validation(contactsSchema), ctrlWrapper(contacts.updateById));

// DELETE
router.delete('/:id', ctrlWrapper(contacts.removeById));

module.exports = router;
