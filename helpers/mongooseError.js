const isUnuqueConflict = ({ name, code }) => name === 'MongoServerError' && code === 11000;

const mongooseError = (error, data, next) => {
  error.status = isUnuqueConflict(error) ? 409 : 400;
  next();
};

module.exports = mongooseError;
