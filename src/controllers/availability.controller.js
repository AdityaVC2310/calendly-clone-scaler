const availabilityService = require('../services/availability.service');

const setAvailability = (req, res, next) => {
  try {
    const { dayOfWeek, startTime, endTime } = req.body;
    const errors = [];

    if (dayOfWeek === undefined || dayOfWeek === null || isNaN(Number(dayOfWeek)) || Number(dayOfWeek) < 0 || Number(dayOfWeek) > 6) {
      errors.push({ field: 'dayOfWeek', message: 'dayOfWeek is required and must be between 0 and 6.' });
    }
    
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    if (!startTime || !timeRegex.test(startTime)) {
      errors.push({ field: 'startTime', message: 'startTime must be in HH:MM format (e.g. "09:00").' });
    }
    
    if (!endTime || !timeRegex.test(endTime)) {
      errors.push({ field: 'endTime', message: 'endTime must be in HH:MM format (e.g. "17:00").' });
    }

    if (startTime && endTime && timeRegex.test(startTime) && timeRegex.test(endTime)) {
        if (startTime >= endTime) {
            errors.push({ field: 'time', message: 'startTime must be before endTime.' });
        }
    }

    if (errors.length > 0) return res.status(400).json({ success: false, message: 'Validation failed.', errors });

    const availability = availabilityService.setAvailability({ dayOfWeek: Number(dayOfWeek), startTime, endTime });
    
    return res.status(201).json({ success: true, message: 'Availability created successfully.', data: availability });
  } catch (err) { next(err); }
};

const getAvailability = (req, res, next) => {
  try {
    const availabilities = availabilityService.getAvailability();
    return res.status(200).json({ success: true, message: 'Availability fetched successfully.', data: availabilities });
  } catch(err) { next(err); }
}

const generateSlots = (req, res, next) => {
  try {
    const { date, duration } = req.query;
    const errors = [];
    
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      errors.push({ field: 'date', message: 'date query param is required and must be YYYY-MM-DD.' });
    }
    if (!duration || isNaN(Number(duration)) || Number(duration) <= 0) {
      errors.push({ field: 'duration', message: 'duration query param is required and must be a positive number.' });
    }

    if (errors.length > 0) return res.status(400).json({ success: false, message: 'Validation failed.', errors });

    const slots = availabilityService.generateSlots({ date, duration: Number(duration) });
    return res.status(200).json({ success: true, message: 'Slots generated successfully.', count: slots.length, data: slots });
  } catch(err) { next(err); }
}

module.exports = { setAvailability, getAvailability, generateSlots };
