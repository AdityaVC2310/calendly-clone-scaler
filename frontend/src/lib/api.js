const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const API = {
  getBookings: async () => {
    const res = await fetch(`${BASE_URL}/api`);
    return res.json();
  },

  createBooking: async (data) => {
    const res = await fetch(`${BASE_URL}/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};