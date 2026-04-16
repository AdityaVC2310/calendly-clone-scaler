const { v4: uuidv4 } = require('uuid');

// ─────────────────────────────────────────────────────────────────────────────
// In-Memory Data Store
// ─────────────────────────────────────────────────────────────────────────────
let availabilities = [];

/**
 * Add a new availability window.
 */
const setAvailability = ({ dayOfWeek, startTime, endTime }) => {
  const newAvailability = {
    id: uuidv4(),
    dayOfWeek: Number(dayOfWeek),
    startTime,
    endTime
  };
  availabilities.push(newAvailability);
  return newAvailability;
};

/**
 * Get all availability windows.
 */
const getAvailability = () => {
  return availabilities;
};

/**
 * Generate time slots for a given date and duration based on availability.
 */
const generateSlots = ({ date, duration }) => {
  // Parse date safely (treating it as UTC to avoid timezone shift issues)
  const parsedDate = new Date(`${date}T00:00:00Z`);
  const dayOfWeek = parsedDate.getUTCDay();

  // Find overlapping availabilities for this day
  const dayAvails = availabilities.filter((a) => a.dayOfWeek === dayOfWeek);

  const slots = [];
  const durationMs = Number(duration) * 60000;

  dayAvails.forEach(av => {
    const [startH, startM] = av.startTime.split(':').map(Number);
    const [endH, endM] = av.endTime.split(':').map(Number);

    let current = new Date(parsedDate);
    current.setUTCHours(startH, startM, 0, 0);

    const end = new Date(parsedDate);
    end.setUTCHours(endH, endM, 0, 0);

    // Increment current time by duration and add to slots
    while (current.getTime() + durationMs <= end.getTime()) {
      const h = current.getUTCHours().toString().padStart(2, '0');
      const m = current.getUTCMinutes().toString().padStart(2, '0');
      slots.push(`${h}:${m}`);

      current = new Date(current.getTime() + durationMs);
    }
  });

  // Deduplicate and sort the slots (in case of overlapping availabilities)
  const uniqueSlots = [...new Set(slots)].sort();
  return uniqueSlots;
};

module.exports = { setAvailability, getAvailability, generateSlots };
