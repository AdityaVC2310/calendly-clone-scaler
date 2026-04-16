const { StatusCodes } = require('http-status-codes');

/**
 * Catch-all for unknown routes — must be registered BEFORE errorHandler.
 */
const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    statusCode: StatusCodes.NOT_FOUND,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
};

module.exports = notFound;
