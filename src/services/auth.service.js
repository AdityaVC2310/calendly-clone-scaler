const prisma = require('../config/prisma');
const ApiError = require('../utils/apiError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

const SALT_ROUNDS = 12;

/**
 * Generate access + refresh token pair
 */
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  });
  return { accessToken, refreshToken };
};

/**
 * Register a new user
 */
const register = async ({ email, username, firstName, lastName, password, timezone }) => {
  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existing) {
    if (existing.email === email) throw ApiError.conflict('Email is already registered.');
    throw ApiError.conflict('Username is already taken.');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: { email, username, firstName, lastName, passwordHash, timezone: timezone || 'UTC' },
    select: {
      id: true, email: true, username: true, firstName: true,
      lastName: true, timezone: true, createdAt: true,
    },
  });

  const tokens = generateTokens(user.id);
  return { user, ...tokens };
};

/**
 * Login with email + password
 */
const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw ApiError.unauthorized('Invalid email or password.');

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw ApiError.unauthorized('Invalid email or password.');

  if (!user.isActive) throw ApiError.forbidden('Your account has been deactivated.');

  const tokens = generateTokens(user.id);
  const { passwordHash: _pw, ...safeUser } = user;
  return { user: safeUser, ...tokens };
};

/**
 * Refresh access token
 */
const refreshAccessToken = async (refreshToken) => {
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
  } catch {
    throw ApiError.unauthorized('Invalid or expired refresh token.');
  }

  const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
  if (!user || !user.isActive) throw ApiError.unauthorized('User not found or inactive.');

  const accessToken = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
  return { accessToken };
};

module.exports = { register, login, refreshAccessToken };
