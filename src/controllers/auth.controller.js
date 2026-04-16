const authService = require('../services/auth.service');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * POST /api/v1/auth/register
 */
const register = asyncHandler(async (req, res) => {
  const { email, username, firstName, lastName, password, timezone } = req.body;
  const result = await authService.register({ email, username, firstName, lastName, password, timezone });
  ApiResponse.created(res, 'Registration successful.', result);
});

/**
 * POST /api/v1/auth/login
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login({ email, password });
  ApiResponse.success(res, 'Login successful.', result);
});

/**
 * POST /api/v1/auth/refresh
 */
const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const result = await authService.refreshAccessToken(refreshToken);
  ApiResponse.success(res, 'Token refreshed.', result);
});

/**
 * GET /api/v1/auth/me
 */
const me = asyncHandler(async (req, res) => {
  ApiResponse.success(res, 'Authenticated user.', req.user);
});

module.exports = { register, login, refresh, me };
