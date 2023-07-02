const express = require('express');

const { contacts } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

// Private Routes
router.use(authenticate);

// GET
router.get('/', ctrlWrapper(contacts.getAll));
router.get('/:id', isValidId, ctrlWrapper(contacts.getById));

// POST
router.post('/', validateBody(schemas.addSchema), ctrlWrapper(contacts.add));

// PUT
router.put('/:id', isValidId, validateBody(schemas.addSchema), ctrlWrapper(contacts.updateById));

// PATCH
router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(contacts.updateFavoriteById),
);

// DELETE
router.delete('/:id', isValidId, ctrlWrapper(contacts.removeById));

module.exports = router;
