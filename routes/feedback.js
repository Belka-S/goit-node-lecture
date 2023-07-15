const express = require('express');

const { sendFeedback } = require('../helpers');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', sendFeedback);

module.exports = router;
