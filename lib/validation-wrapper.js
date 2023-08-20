const { validationResult } = require('express-validator');
const CustomError = require('../../lib/customError');

const validationWrapper = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    next(new CustomError('Validation error', 400, errors.errors));
  };
};

module.exports = validationWrapper;
