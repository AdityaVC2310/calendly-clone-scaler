const userService = require('../services/user.service');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * GET /api/v1/users/me
 */
const getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.user.id);
  ApiResponse.success(res, 'Profile fetched.', user);
});

/**
 * PATCH /api/v1/users/me
 */
const updateProfile = asyncHandler(async (req, res) => {
  const updated = await userService.updateProfile(req.user.id, req.body);
  ApiResponse.success(res, 'Profile updated.', updated);
});

/**
 * GET /api/v1/users/:username
 */
const getPublicProfile = asyncHandler(async (req, res) => {
  const profile = await userService.getPublicProfile(req.params.username);
  ApiResponse.success(res, 'Public profile fetched.', profile);
});

module.exports = { getProfile, updateProfile, getPublicProfile };
