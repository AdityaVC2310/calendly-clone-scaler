"use client";

export default function Sidebar({ onCreate }) {
  return (
    <div className="w-64 bg-white border-r p-5 flex flex-col">

      {/* LOGO */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          C
        </div>
        <h1 className="text-xl font-semibold text-blue-600">Calendly</h1>
      </div>

      {/* CREATE BUTTON */}
      <button
        onClick={onCreate}
        className="bg-blue-600 text-white py-2 rounded-lg mb-6 hover:bg-blue-700 transition"
      >
        + Create
      </button>

      {/* MENU */}
      <div className="flex flex-col gap-3 text-sm">
        <p className="text-blue-600 font-medium cursor-pointer">Scheduling</p>
        <p className="text-gray-600 cursor-pointer hover:text-black">Meetings</p>
        <p className="text-gray-600 cursor-pointer hover:text-black">Availability</p>
      </div>
    </div>
  );
}