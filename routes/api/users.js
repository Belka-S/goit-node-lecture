const express = require('express');

const { users } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, isValidId, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

// Get all users
router.get('/', ctrlWrapper(users.getAll));

// Get current user
router.get('/current', authenticate, ctrlWrapper(users.getCurrent));

// Update avatar
router.patch('/avatars', authenticate, upload.single('avatar'), ctrlWrapper(users.updateAvatar));

// Update subscription
router.patch(
  '/:id',
  isValidId,
  validateBody(schemas.updateSubscriptionSchema),
  ctrlWrapper(users.updateSubscriptionById),
);

module.exports = router;
