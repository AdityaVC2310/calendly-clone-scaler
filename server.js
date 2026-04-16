import http from "http";
import app from "./src/app.js";

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Health: http://localhost:${PORT}/health`);
});

server.on("error", (err) => {
  console.error("❌ Server error:", err.message);
  process.exit(1);
});