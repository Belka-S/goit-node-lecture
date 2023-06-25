const express = require('express');
const moment = require('moment');
const fs = require('fs/promises');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

const app = express();
const contactsRouter = require('./routes/api/contacts');
const fotmatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(fotmatsLogger)); // Write logs
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON

// Write logs to file
app.use((req, res, next) => {
  const { method, url } = req;
  const date = moment().format('DD-MM-YYYY_hh:mm:ss');
  fs.appendFile('./server.log', `${method} ${url} ${date}\n`);
  next();
});

// Contacts operations
app.use('/api/contacts', contactsRouter);

// Not found address error
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Send error
app.use((err, req, res, next) => {
  const { status = 500, code, message = 'Server error!' } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
