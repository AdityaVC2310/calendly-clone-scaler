const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const prisma = require('../config/prisma');
const env = require('../config/env');

/**
 * Protect routes — validates Bearer JWT and attaches req.user
 */
const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw ApiError.unauthorized('No authentication token provided.');
  }

  const token = authHeader.split(' ')[1];

  let decoded;
  try {
    decoded = jwt.verify(token, env.JWT_SECRET);
  } catch {
    throw ApiError.unauthorized('Invalid or expired token.');
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      timezone: true,
      isActive: true,
    },
  });

  if (!user) throw ApiError.unauthorized('User no longer exists.');
  if (!user.isActive) throw ApiError.forbidden('Your account has been deactivated.');

  req.user = user;
  next();
});

/**
 * Authorize by role(s) — must be used AFTER authenticate
 * (Currently role-less; extend when roles are added to the User model)
 */
const authorize = (..._roles) => (req, _res, next) => next();

module.exports = { authenticate, authorize };
