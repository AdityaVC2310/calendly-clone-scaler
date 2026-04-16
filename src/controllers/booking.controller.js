const schedulingService = require('../services/scheduling.service');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * POST /api/v1/bookings   — public, no auth required
 */
const book = asyncHandler(async (req, res) => {
  const event = await schedulingService.bookEvent(req.body);
  ApiResponse.created(res, 'Event booked successfully.', event);
});

/**
 * GET /api/v1/bookings   — authenticated host
 */
const list = asyncHandler(async (req, res) => {
  const { status, from, to, page, limit } = req.query;
  const result = await schedulingService.listHostEvents(req.user.id, {
    status, from, to,
    page: page ? parseInt(page, 10) : 1,
    limit: limit ? parseInt(limit, 10) : 20,
  });
  ApiResponse.success(res, 'Bookings fetched.', result.events, {
    total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages,
  });
});

/**
 * GET /api/v1/bookings/:id
 */
const getOne = asyncHandler(async (req, res) => {
  const event = await schedulingService.getScheduledEvent(req.params.id, req.user.id);
  ApiResponse.success(res, 'Booking fetched.', event);
});

/**
 * POST /api/v1/bookings/:id/cancel
 */
const cancel = asyncHandler(async (req, res) => {
  const { cancelToken, reason } = req.body;
  const event = await schedulingService.cancelEvent(req.params.id, {
    cancelToken,
    userId: req.user?.id,
    reason,
  });
  ApiResponse.success(res, 'Booking cancelled.', event);
});

module.exports = { book, list, getOne, cancel };
