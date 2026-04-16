
import express from "express";
import cors from "cors";

import bookingRoutes from "./routes/booking.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/meetings", meetingRoutes);
app.use("/api/v1/availability", availabilityRoutes);

export default app;