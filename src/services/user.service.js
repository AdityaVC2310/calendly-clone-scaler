const prisma = require('../config/prisma');
const ApiError = require('../utils/apiError');

/**
 * Get the authenticated user's profile
 */
const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true, email: true, username: true, firstName: true, lastName: true,
      bio: true, avatarUrl: true, timezone: true, isVerified: true, createdAt: true,
    },
  });
  if (!user) throw ApiError.notFound('User not found.');
  return user;
};

/**
 * Update the authenticated user's profile
 */
const updateProfile = async (userId, data) => {
  const { firstName, lastName, bio, avatarUrl, timezone } = data;

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { firstName, lastName, bio, avatarUrl, timezone },
    select: {
      id: true, email: true, username: true, firstName: true, lastName: true,
      bio: true, avatarUrl: true, timezone: true, updatedAt: true,
    },
  });
  return updated;
};

/**
 * Get a public user profile by username
 */
const getPublicProfile = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true, username: true, firstName: true, lastName: true,
      bio: true, avatarUrl: true, timezone: true,
      eventTypes: {
        where: { isActive: true },
        select: { id: true, title: true, slug: true, duration: true, color: true, description: true, locationType: true },
      },
    },
  });
  if (!user) throw ApiError.notFound(`User @${username} not found.`);
  return user;
};

module.exports = { getProfile, updateProfile, getPublicProfile };
