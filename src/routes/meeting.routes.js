import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

/**
 * GET ALL MEETINGS
 */
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const meetings = await prisma.scheduledEvent.findMany({
            where: {
                hostId: userId,
            },
            orderBy: {
                startTime: "asc",
            },
        });

        res.json({
            success: true,
            data: meetings,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error fetching meetings",
        });
    }
});

/**
 * CANCEL MEETING
 */
router.put("/cancel/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.scheduledEvent.update({
            where: { id },
            data: {
                status: "CANCELLED",
            },
        });

        res.json({
            success: true,
            message: "Meeting cancelled",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error cancelling meeting",
        });
    }
});

export default router;