import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Health route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// ✅ Booking route (main API)
app.post("/api/v1/bookings", (req, res) => {
  const data = req.body;

  return res.json({
    success: true,
    data: {
      ...data,
      id: Date.now(),
    },
  });
});

// Export for Vercel
export default app;