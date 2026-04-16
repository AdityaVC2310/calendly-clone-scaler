const prisma = require('../config/prisma');
const ApiError = require('../utils/apiError');
const { v4: uuidv4 } = require('uuid');

/**
 * Book a scheduled event (anonymous or authenticated invitee)
 */
const bookEvent = async ({ hostUsername, eventTypeSlug, startTime, timezone, inviteeInfo, answers = [] }) => {
  // Resolve host + event type
  const host = await prisma.user.findUnique({ where: { username: hostUsername } });
  if (!host) throw ApiError.notFound(`Host @${hostUsername} not found.`);

  const eventType = await prisma.eventType.findUnique({
    where: { userId_slug: { userId: host.id, slug: eventTypeSlug } },
  });
  if (!eventType || !eventType.isActive) throw ApiError.notFound('Event type not found or inactive.');

  const start = new Date(startTime);
  const end = new Date(start.getTime() + eventType.duration * 60_000);

  // Check for conflicts on host's calendar
  const conflict = await prisma.scheduledEvent.findFirst({
    where: {
      hostId: host.id,
      status: { in: ['CONFIRMED', 'PENDING'] },
      OR: [
        { startTime: { lte: start }, endTime: { gt: start } },
        { startTime: { lt: end }, endTime: { gte: end } },
        { startTime: { gte: start }, endTime: { lte: end } },
      ],
    },
  });
  if (conflict) throw ApiError.conflict('The selected time slot is no longer available.');

  const cancelToken = uuidv4();
  const rescheduleToken = uuidv4();

  const event = await prisma.scheduledEvent.create({
    data: {
      hostId: host.id,
      eventTypeId: eventType.id,
      title: `${eventType.title} with ${inviteeInfo.name}`,
      startTime: start,
      endTime: end,
      timezone,
      status: eventType.requiresConfirmation ? 'PENDING' : 'CONFIRMED',
      locationType: eventType.locationType,
      locationValue: eventType.locationValue,
      cancelToken,
      rescheduleToken,
      inviteeInfo: {
        create: {
          name: inviteeInfo.name,
          email: inviteeInfo.email,
          phone: inviteeInfo.phone,
          notes: inviteeInfo.notes,
        },
      },
      answers: {
        create: answers.map(({ questionId, answer }) => ({ questionId, answer })),
      },
    },
    include: { inviteeInfo: true, eventType: true },
  });

  return event;
};

/**
 * List events for the authenticated host
 */
const listHostEvents = async (
  hostId,
  { status, from, to, page = 1, limit = 20 } = {}
) => {
  const where = {
    hostId,
    ...(status && { status }),
    ...(from || to ? { startTime: { ...(from && { gte: new Date(from) }), ...(to && { lte: new Date(to) }) } } : {}),
  };

  const [total, events] = await Promise.all([
    prisma.scheduledEvent.count({ where }),
    prisma.scheduledEvent.findMany({
      where,
      include: { inviteeInfo: true, eventType: { select: { title: true, duration: true, color: true } } },
      orderBy: { startTime: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return { events, total, page, limit, totalPages: Math.ceil(total / limit) };
};

/**
 * Get a single scheduled event by ID
 */
const getScheduledEvent = async (eventId, userId) => {
  const event = await prisma.scheduledEvent.findFirst({
    where: { id: eventId, OR: [{ hostId: userId }, { inviteeId: userId }] },
    include: { inviteeInfo: true, eventType: true, answers: true },
  });
  if (!event) throw ApiError.notFound('Scheduled event not found.');
  return event;
};

/**
 * Cancel a booking via token or authenticated host
 */
const cancelEvent = async (eventId, { cancelToken, userId, reason }) => {
  const event = await prisma.scheduledEvent.findFirst({
    where: {
      id: eventId,
      OR: [
        ...(cancelToken ? [{ cancelToken }] : []),
        ...(userId ? [{ hostId: userId }] : []),
      ],
    },
  });
  if (!event) throw ApiError.notFound('Scheduled event not found.');
  if (['CANCELLED', 'COMPLETED'].includes(event.status)) {
    throw ApiError.badRequest(`Event is already ${event.status.toLowerCase()}.`);
  }

  return prisma.scheduledEvent.update({
    where: { id: eventId },
    data: { status: 'CANCELLED', cancelReason: reason },
  });
};

module.exports = { bookEvent, listHostEvents, getScheduledEvent, cancelEvent };
