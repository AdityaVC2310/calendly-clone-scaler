const { validationResult } = require('express-validator');
const ApiError = require('../utils/apiError');

/**
 * Run after express-validator chains — collects errors and throws ApiError.
 */
const validate = (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
    }));
    throw ApiError.badRequest('Validation failed.', formattedErrors);
  }
  next();
};

module.exports = validate;
