const { StatusCodes } = require('http-status-codes');

/**
 * Custom API Error class — throw these inside controllers/services
 */
class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad Request', errors = []) {
    return new ApiError(StatusCodes.BAD_REQUEST, message, errors);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(StatusCodes.UNAUTHORIZED, message);
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(StatusCodes.FORBIDDEN, message);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(StatusCodes.NOT_FOUND, message);
  }

  static conflict(message = 'Conflict') {
    return new ApiError(StatusCodes.CONFLICT, message);
  }

  static internal(message = 'Internal Server Error') {
    return new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

module.exports = ApiError;
