"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "User";
  const email = searchParams.get("email") || "";
  const event = searchParams.get("event") || "Meeting";
  const time = searchParams.get("time") || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">

        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Booking Confirmed 🎉
        </h1>

        <p className="text-gray-700 mb-2">
          Thank you, <span className="font-semibold">{name}</span>
        </p>

        {email && (
          <p className="text-gray-600 text-sm mb-2">
            Confirmation sent to: {email}
          </p>
        )}

        <div className="mt-4 text-left text-gray-700">
          <p><strong>Event:</strong> {event}</p>
          {time && <p><strong>Time:</strong> {time}</p>}
        </div>

        <a
          href="/dashboard"
          className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}