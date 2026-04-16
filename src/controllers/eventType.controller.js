const eventTypeService = require('../services/eventType.service');

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/v1/event-types
// ─────────────────────────────────────────────────────────────────────────────
const create = (req, res, next) => {
  try {
    const { title, duration, slug } = req.body;

    // ── Validation ────────────────────────────────────────────────────────────
    const errors = [];

    if (!title || typeof title !== 'string' || title.trim() === '') {
      errors.push({ field: 'title', message: 'Title is required and must be a non-empty string.' });
    }

    if (!duration || isNaN(Number(duration))) {
      errors.push({ field: 'duration', message: 'Duration is required and must be a valid number.' });
    }

    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      errors.push({ field: 'slug', message: 'Slug is required and must be a non-empty string.' });
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: 'Validation failed.', errors });
    }
    // ── End Validation ────────────────────────────────────────────────────────

    const eventType = eventTypeService.createEventType({
      title: title.trim(),
      duration,
      slug: slug.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'Event type created successfully.',
      data: eventType,
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/event-types
// ─────────────────────────────────────────────────────────────────────────────
const getAll = (req, res, next) => {
  try {
    const eventTypes = eventTypeService.getAllEventTypes();

    return res.status(200).json({
      success: true,
      message: 'Event types fetched successfully.',
      count: eventTypes.length,
      data: eventTypes,
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/event-types/:slug
// ─────────────────────────────────────────────────────────────────────────────
const getBySlug = (req, res, next) => {
  try {
    const { slug } = req.params;
    const eventType = eventTypeService.getEventTypeBySlug(slug);

    return res.status(200).json({
      success: true,
      message: 'Event type fetched successfully.',
      data: eventType,
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/v1/event-types/:id
// ─────────────────────────────────────────────────────────────────────────────
const remove = (req, res, next) => {
  try {
    const { id } = req.params;
    eventTypeService.deleteEventType(id);

    return res.status(200).json({
      success: true,
      message: 'Event type deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { create, getAll, getBySlug, remove };
