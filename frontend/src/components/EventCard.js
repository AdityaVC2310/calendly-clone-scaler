"use client";

import { Copy, Settings, ArrowRight } from "lucide-react";

export default function EventCard({ event, onDelete }) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`http://localhost:3000/book/${event.slug}`);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all flex flex-col relative overflow-hidden group">
      {/* Top Decorator Line */}
      <div className="absolute left-0 top-0 right-0 h-1 bg-[#8C52FF]"></div>

      {/* Main Content */}
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-2xl text-gray-800 tracking-tight">
            {event.title}
          </h3>
          <button className="text-gray-400 hover:text-gray-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-500 text-[15px] mb-2 font-medium">
          {event.duration} min • Google Meet • One-on-One
        </p>
        <p className="text-gray-400 text-sm mb-2">
          Weekdays, 9 am - 5 pm
        </p>
        <a
          href={`/book/${event.slug}`}
          target="_blank"
          rel="noreferrer"
          className="text-[#0066FF] hover:underline font-medium text-sm flex items-center gap-1 mt-4"
        >
          View booking page 
        </a>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
        <button
          onClick={handleCopyLink}
          className="text-[#0066FF] font-semibold text-sm hover:text-blue-800 rounded-full flex items-center gap-2 transition"
        >
          <Copy className="w-4 h-4" />
          Copy link
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => onDelete(event.id)}
            className="text-gray-500 hover:text-red-600 text-sm font-medium transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
