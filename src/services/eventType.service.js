const prisma = require('../config/prisma');
const { v4: uuidv4 } = require('uuid');

// CREATE EVENT TYPE
const createEventType = async (data) => {
  const event = await prisma.eventType.create({
    data: {
      id: uuidv4(),
      title: data.title,
      slug: data.title.toLowerCase().replace(/\s+/g, "-"),
      duration: data.duration,
    },
  });

  return event;
};

// GET ALL EVENTS
const getAllEventTypes = async () => {
  return await prisma.eventType.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

// GET SINGLE EVENT BY SLUG
const getEventBySlug = async (slug) => {
  return await prisma.eventType.findUnique({
    where: { slug },
  });
};

module.exports = {
  createEventType,
  getAllEventTypes,
  getEventBySlug,
};