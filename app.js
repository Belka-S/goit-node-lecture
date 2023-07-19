const express = require('express');
const logger = require('morgan');
require('dotenv').config();

const app = express();
const whiskyRouter = require('./routes/api/whisky');
const fotmatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(fotmatsLogger)); // Write logs

// EJS
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/whisky', whiskyRouter);

// Not found address error
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Send error
app.use((err, req, res, next) => {
  const { status = 500, code, message = 'Server error!' } = err;
  res.status(status).json({ message: err.message, code });
});

module.exports = app;
