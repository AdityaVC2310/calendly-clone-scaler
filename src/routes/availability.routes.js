import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

/**
 * SAVE AVAILABILITY
 */
router.post("/", async (req, res) => {
    try {
        const { userId, days } = req.body;

        if (!userId || !days) {
            return res.status(400).json({
                message: "Missing userId or days",
            });
        }

        // ❌ remove old
        await prisma.availability.deleteMany({
            where: { userId },
        });

        // ✅ insert new
        const availabilityData = days.map((d) => ({
            userId,
            dayOfWeek: d.day,
            startTime: d.startTime,
            endTime: d.endTime,
        }));

        await prisma.availability.createMany({
            data: availabilityData,
        });

        return res.json({
            success: true,
            message: "Availability saved",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});

/**
 * GET AVAILABILITY
 */
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const data = await prisma.availability.findMany({
            where: { userId },
        });

        res.json({
            success: true,
            data,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching availability",
        });
    }
});

export default router;