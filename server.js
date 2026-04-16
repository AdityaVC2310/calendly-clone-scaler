import bookingRoutes from "./routes/booking.routes.js";

app.use("/api/v1/bookings", bookingRoutes);
import meetingRoutes from "./routes/meeting.routes.js";

app.use("/api/v1/meetings", meetingRoutes);
const http = require('http');
const app = require('./src/app');

// Port 4000 or process.env.PORT to avoid conflicts
const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Health: http://localhost:${PORT}/health`);
  console.log(`📡 API:    http://localhost:${PORT}/api/v1/event-types`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
  } else {
    console.error('❌ Server error:', err.message);
  }
  process.exit(1);
});

const shutdown = (signal) => {
  console.log(`\n${signal} received — shutting down gracefully...`);
  server.close(() => {
    console.log('👋 Server stopped.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));