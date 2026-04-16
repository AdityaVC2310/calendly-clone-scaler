"use client";

import { useState } from "react";

export default function AvailabilityPage() {

  const [days, setDays] = useState([
    { name: "Sunday", enabled: false },
    { name: "Monday", enabled: true },
    { name: "Tuesday", enabled: true },
    { name: "Wednesday", enabled: true },
    { name: "Thursday", enabled: true },
    { name: "Friday", enabled: true },
    { name: "Saturday", enabled: false },
  ]);

  const toggleDay = (index) => {
    const updated = [...days];
    updated[index].enabled = !updated[index].enabled;
    setDays(updated);
  };

  // 🔥 THIS IS handleSave
  const handleSave = async () => {
    try {
      const selectedDays = days
        .map((d, index) => ({
          day: index,
          enabled: d.enabled,
          startTime: "09:00",
          endTime: "17:00",
        }))
        .filter((d) => d.enabled);

      console.log("Sending:", selectedDays);

      const res = await fetch("http://localhost:4000/api/v1/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "demo-user-id",
          days: selectedDays,
        }),
      });

      const data = await res.json();

      console.log("Response:", data);

      if (res.ok) {
        alert("✅ Availability Saved");
      } else {
        alert("❌ " + data.message);
      }

    } catch (err) {
      console.error(err);
      alert("❌ Error saving");
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Availability</h1>

      <div className="bg-white rounded-xl shadow p-6 w-[500px]">

        {days.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b"
          >
            <span className="text-lg">{day.name}</span>

            <input
              type="checkbox"
              checked={day.enabled}
              onChange={() => toggleDay(index)}
              className="w-5 h-5"
            />
          </div>
        ))}

        {/* 🔥 BUTTON CONNECTED */}
        <button
          onClick={handleSave}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Availability
        </button>

      </div>
    </div>
  );
}