import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

/**
 * CREATE BOOKING
 */
router.post("/", async (req, res) => {
  try {
    const {
      eventTypeId,
      title,
      startTime,
      endTime,
    } = req.body;

    // ⚠️ TEMP USER (replace later with auth)
    const hostId = "demo-user-id";

    const booking = await prisma.scheduledEvent.create({
      data: {
        hostId,
        eventTypeId,
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        timezone: "Asia/Kolkata",
        status: "CONFIRMED",
      },
    });

    res.json({
      success: true,
      data: booking,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Booking failed",
    });
  }
});

export default router;