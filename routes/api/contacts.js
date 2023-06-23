const express = require('express');

const { contacts } = require('../../controllers');
const { validation } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');
const { contactsSchema } = require('../../schemas');

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
