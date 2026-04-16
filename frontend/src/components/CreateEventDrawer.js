"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateEventDrawer({ open, onClose }) {
  const [title, setTitle] = useState("New Meeting");
  const [duration, setDuration] = useState(30);
  const [location, setLocation] = useState("Zoom");
  const [type, setType] = useState("One-on-One");

  const router = useRouter();

  // ✅ GET TYPE FROM DASHBOARD CLICK
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedType = localStorage.getItem("eventType");
      if (storedType) setType(storedType);
    }
  }, []);

  if (!open) return null;

  const handleCreate = () => {
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    // ✅ SAVE FULL EVENT DATA
    localStorage.setItem(
      "eventDraft",
      JSON.stringify({
        title,
        slug,
        duration,
        location,
        type, // ✅ IMPORTANT
      })
    );

    router.push(`/book/${slug}`);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-end z-50">

      <div className="w-[420px] bg-white h-full p-6 shadow-lg overflow-y-auto">

        {/* CLOSE */}
        <div className="flex justify-end">
          <button onClick={onClose}>✕</button>
        </div>

        {/* TITLE */}
        <p className="text-sm text-gray-500 mb-1">Event type</p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        {/* TYPE DISPLAY */}
        <p className="text-sm text-gray-400 mb-4">{type}</p>

        {/* DURATION */}
        <p className="font-medium mb-2">Duration</p>
        <select
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full border p-2 rounded mb-4"
        >
          <option value={15}>15 min</option>
          <option value={30}>30 min</option>
          <option value={60}>60 min</option>
        </select>

        {/* LOCATION */}
        <p className="font-medium mb-2">Location</p>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {["Zoom", "Phone call", "In-person"].map((loc) => (
            <button
              key={loc}
              onClick={() => setLocation(loc)}
              className={`border p-2 rounded transition 
                                ${location === loc ? "border-blue-600 text-blue-600 bg-blue-50" : ""}`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* STATIC UI */}
        <div className="border-t pt-4 space-y-3 text-sm text-gray-500">
          <p>Availability: Weekdays, 9am - 5pm</p>
          <p>Invitee limit: {type}</p>
          <p>Host: You</p>
        </div>

        {/* CREATE BUTTON */}
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-500 cursor-pointer">
            More options
          </p>

          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}