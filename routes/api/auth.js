const express = require('express');

const { auth } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

// Register // SignUp
router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(auth.register));

// Login // SignIn
router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(auth.login));
router.get('/current', authenticate, ctrlWrapper(auth.getCurrent));

// Logout
router.post('/logout', authenticate, ctrlWrapper(auth.logout));

module.exports = router;
