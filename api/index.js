import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Health route (IMPORTANT CHANGE)
app.get("/api", (req, res) => {
    res.json({ message: "Backend is running 🚀" });
});

// ✅ Booking route
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

// 👇 THIS IS IMPORTANT FOR VERCEL
export default app;