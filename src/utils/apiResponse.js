const { StatusCodes } = require('http-status-codes');

/**
 * Standard API response envelope
 */
class ApiResponse {
  constructor(statusCode, message, data = null, meta = null) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    if (data !== null) this.data = data;
    if (meta !== null) this.meta = meta;
  }

  static success(res, message = 'Success', data = null, meta = null, statusCode = StatusCodes.OK) {
    return res.status(statusCode).json(new ApiResponse(statusCode, message, data, meta));
  }

  static created(res, message = 'Created', data = null) {
    return res.status(StatusCodes.CREATED).json(new ApiResponse(StatusCodes.CREATED, message, data));
  }

  static noContent(res) {
    return res.status(StatusCodes.NO_CONTENT).send();
  }
}

module.exports = ApiResponse;
