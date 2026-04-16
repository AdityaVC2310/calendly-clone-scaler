"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BookingPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // LOAD EVENT FROM LOCAL STORAGE
  useEffect(() => {
    const data = localStorage.getItem("eventDraft");
    if (data) {
      setEvent(JSON.parse(data));
    }
  }, []);

  // SIMPLE STATIC TIME SLOTS
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00",
    "14:00", "14:30", "15:00", "15:30"
  ];

  // GENERATE DATES (NEXT 30 DAYS)
  const today = new Date();
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d;
  });

  // CONFIRM BOOKING
  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Select date & time");
      return;
    }

    try {
      const start = new Date(selectedDate);
      const [h, m] = selectedTime.split(":");

      start.setHours(Number(h));
      start.setMinutes(Number(m));

      const end = new Date(start);
      end.setMinutes(end.getMinutes() + (event?.duration || 30));

      const res = await fetch("http://localhost:4000/api/v1/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventTypeId: "temp-id",
          title: event?.title || "Meeting",
          startTime: start,
          endTime: end,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Booking Confirmed");
        router.push("/meetings");
      } else {
        alert("❌ Failed");
      }

    } catch (err) {
      console.error(err);
      alert("Error booking");
    }
  };

  if (!event) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-center">

      <div className="bg-white rounded-2xl shadow-xl w-[900px] flex overflow-hidden">

        {/* LEFT PANEL */}
        <div className="w-1/3 p-6 border-r bg-gray-50">
          <p className="text-sm text-gray-500">Aditya Vikram</p>

          <h1 className="text-2xl font-bold mt-2">
            {event.title}
          </h1>

          <p className="text-gray-500 mt-2">
            ⏱ {event.duration} min
          </p>

          <p className="text-gray-500 mt-2">
            📍 {event.location}
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-2/3 p-6">

          <h2 className="text-lg font-semibold mb-4">
            Select a Date & Time
          </h2>

          {/* DATE GRID */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {dates.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(d)}
                className={`p-2 rounded-lg text-sm border 
                                    ${selectedDate?.toDateString() === d.toDateString()
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                  }`}
              >
                {d.getDate()}
              </button>
            ))}
          </div>

          {/* TIME SLOTS */}
          {selectedDate && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 border rounded-lg
                                        ${selectedTime === time
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                    }`}
                >
                  {time}
                </button>
              ))}
            </div>
          )}

          {/* CONFIRM */}
          <button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90"
          >
            Confirm Booking
          </button>

        </div>
      </div>
    </div>
  );
}