const express = require('express');
const moment = require('moment');
const fs = require('fs/promises');
const cors = require('cors');
const logger = require('morgan');

const app = express();
const contactsRouter = require('./routes/api/contacts');
const fotmatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(fotmatsLogger));
app.use(cors());
app.use(express.json());

// Write logs to file
app.use((req, res, next) => {
  const { method, url } = req;
  const date = moment().format('DD-MM-YYYY_hh:mm:ss');
  fs.appendFile('./app.log', `${method} ${url} ${date}\n`);
  next();
});

// Contacts operations
app.use('/api/contacts', contactsRouter);

// Send error
app.use((err, req, res, next) => {
  const { status = 500, code, message = 'Server error!' } = err;
  res.status(status).json({ message: err.message });
});

// Run server on port
const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
