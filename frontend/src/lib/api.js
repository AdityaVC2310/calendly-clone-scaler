const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const API = {
  getEvents: async () => {
    const res = await fetch(`${BASE_URL}/api/v1/event-types`);
    return res.json();
  },

  createEvent: async (data) => {
    const res = await fetch(`${BASE_URL}/api/v1/event-types`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getBookings: async () => {
    const res = await fetch(`${BASE_URL}/api/v1/bookings`);
    return res.json();
  },

  createBooking: async (data) => {
    const res = await fetch(`${BASE_URL}/api/v1/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};