const express = require("express");
const router = express.Router();

let eventTypes = [];

// ✅ GET EVENT TYPES
router.get("/", (req, res) => {
  // 🔥 SEED DATA (important)
  if (eventTypes.length === 0) {
    eventTypes.push({
      id: "1",
      title: "30 Min Meeting",
      duration: 30,
      slug: "30-min-meeting",
    });
  }

  res.json({
    success: true,
    data: eventTypes,
  });
});

// ✅ CREATE EVENT
router.post("/", (req, res) => {
  const { title, duration, slug } = req.body;

  const newEvent = {
    id: Date.now().toString(),
    title,
    duration,
    slug,
  };

  eventTypes.push(newEvent);

  res.json({
    success: true,
    data: newEvent,
  });
});

module.exports = router;