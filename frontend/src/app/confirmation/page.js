"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConfirmationPage() {
  const params = useSearchParams();
  const router = useRouter();

  const name = params.get("name");
  const time = params.get("time");
  const date = params.get("date");

  // ✅ SAVE booking in localStorage (temporary DB)
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("meetings")) || [];

    const newMeeting = {
      name,
      time,
      date,
    };

    localStorage.setItem(
      "meetings",
      JSON.stringify([...existing, newMeeting])
    );

    // ✅ REDIRECT after 2 seconds
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-xl text-center">
        <h2 className="text-green-600 text-xl font-semibold">
          Meeting Confirmed 🎉
        </h2>
        <p className="mt-2 text-gray-600">
          {name}, your meeting is scheduled at:
        </p>
        <p className="text-blue-600 mt-2 font-medium">
          {time} on {date}
        </p>
      </div>
    </div>
  );
}