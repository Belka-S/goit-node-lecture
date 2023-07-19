const app = require('./app');

const { PORT = 3000 } = process.env;

// Run server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
