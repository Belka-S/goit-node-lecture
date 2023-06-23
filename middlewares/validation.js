const HttpError = require('../helpers/HttpError');

const validation = cshema => {
  return (req, res, next) => {
    const { error } = cshema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
};

module.exports = validation;
