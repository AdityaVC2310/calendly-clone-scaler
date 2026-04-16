const logger = require('./logger');

/**
 * Wraps async route handlers to forward errors to Express error middleware.
 * Usage: router.get('/', asyncHandler(async (req, res) => { ... }))
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    logger.error(`Unhandled error in ${req.method} ${req.originalUrl}: ${err.message}`);
    next(err);
  });
};

module.exports = asyncHandler;
