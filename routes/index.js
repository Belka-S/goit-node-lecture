const express = require('express');
const router = express.Router();

// Home page
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Login page
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  res.render('response', { title: 'Simple express app', email, password });
});

module.exports = router;
