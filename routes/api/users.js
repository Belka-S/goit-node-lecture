const express = require('express');

const { users } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

// GET
router.get('/', ctrlWrapper(users.getAll));

// PATCH
router.patch(
  '/:id',
  isValidId,
  validateBody(schemas.updateSubscriptionSchema),
  ctrlWrapper(users.updateSubscriptionById),
);

module.exports = router;
