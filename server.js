const app = require('./app');

// Run server on port
const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
