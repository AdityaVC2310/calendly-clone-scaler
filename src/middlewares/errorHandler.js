const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');
const { StatusCodes } = require('http-status-codes');
const { Prisma } = require('@prisma/client');

/**
 * Global error handling middleware — must be registered LAST in Express.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];

  // ── Prisma known errors ──────────────────────────────────────────────────
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      // Unique constraint violated
      const field = err.meta?.target?.[0] ?? 'field';
      statusCode = StatusCodes.CONFLICT;
      message = `A record with this ${field} already exists.`;
    } else if (err.code === 'P2025') {
      // Record not found
      statusCode = StatusCodes.NOT_FOUND;
      message = 'Record not found.';
    } else if (err.code === 'P2003') {
      statusCode = StatusCodes.BAD_REQUEST;
      message = 'Related record not found (foreign key constraint failed).';
    }
  }

  // ── Prisma validation errors ─────────────────────────────────────────────
  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Invalid data provided.';
  }

  // ── JWT errors ───────────────────────────────────────────────────────────
  if (err.name === 'JsonWebTokenError') {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Invalid token.';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Token has expired.';
  }

  // ── Log ─────────────────────────────────────────────────────────────────
  if (statusCode >= 500) {
    logger.error('Server Error:', { message, stack: err.stack, url: req.originalUrl });
  } else {
    logger.warn('Client Error:', { statusCode, message, url: req.originalUrl });
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(errors.length > 0 && { errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
