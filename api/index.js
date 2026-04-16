export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      message: "Backend is running 🚀",
    });
  }

  if (req.method === "POST") {
    return res.status(200).json({
      success: true,
      data: {
        ...req.body,
        id: Date.now(),
      },
    });
  }

  return res.status(405).json({ message: "Method not allowed" });
}