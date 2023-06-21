const express = require('express');
const moment = require('moment');
const fs = require('fs/promises');
const cors = require('cors');

const app = express();
const contactsRouter = require('./routes/api/contacts');

// Allow cross-origin requests
app.use(cors());

// Tratsform JSON body
app.use(express.json());

// Write logs to file
app.use((req, res, next) => {
  const { method, url } = req;
  const date = moment().format('DD-MM-YYYY_hh:mm:ss');
  fs.appendFile('./data/server.log', `${method} ${url} ${date}\n`);
  next();
});

// Get Contacts
app.use('/api/contacts', contactsRouter);

// Get HomePage
app.get('/', (req, res) => {
  console.log(req.method, req.url);
  res.send('<h2>Home Page</h2>');
});

// Send 404 error
app.use((res, req) => {
  res.status(404).json({ error: 'Not found' });
});

// Run server on port
app.listen(3001, () => console.log('Server is running!'));
