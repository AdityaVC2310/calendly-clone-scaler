import availabilityRoutes from "./routes/availability.routes.js";

app.use("/api/v1/availability", availabilityRoutes);
const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

// ✅ Health Check
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
  });
});

// ✅ Routes
const eventTypeRoutes = require('./routes/eventType.routes');
const availabilityRoutes = require('./routes/availability.routes');
const bookingRoutes = require('./routes/booking.routes');

// Event APIs
app.use('/api/v1/event-types', eventTypeRoutes);

// Availability APIs
app.use('/api/v1', availabilityRoutes);

// 🔥 FIXED Booking API
app.use('/api/v1', bookingRoutes);

// ❌ 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

module.exports = app;