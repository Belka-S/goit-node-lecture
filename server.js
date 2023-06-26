const mongoose = require('mongoose');

const app = require('./app');

const { DB_HOST } = process.env;
const PORT = 3001;

// Run server
mongoose
  .connect(DB_HOST)
  .then(app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
