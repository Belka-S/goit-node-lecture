const validation = cshema => {
  return (req, res, next) => {
    const { error } = cshema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = validation;
