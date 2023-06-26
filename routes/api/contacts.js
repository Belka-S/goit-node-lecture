const express = require('express');

const { contacts } = require('../../controllers');
const { valideteBody, isValidId } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/contact');

const router = express.Router();

// GET
router.get('/', ctrlWrapper(contacts.getAll));
router.get('/:id', isValidId, ctrlWrapper(contacts.getById));

// POST
router.post('/', valideteBody(schemas.addSchema), ctrlWrapper(contacts.add));

// PUT
router.put('/:id', isValidId, valideteBody(schemas.addSchema), ctrlWrapper(contacts.updateById));

// PATCH
router.patch(
  '/:id/favorite',
  isValidId,
  valideteBody(schemas.updateFavoriteSchema),
  ctrlWrapper(contacts.updateFavoriteById),
);

// DELETE
router.delete('/:id', isValidId, ctrlWrapper(contacts.removeById));

module.exports = router;
