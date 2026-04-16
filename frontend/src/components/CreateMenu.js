"use client";

export default function CreateMenu({ open, onClose, onSelect }) {
  if (!open) return null;

  return (
    <div className="absolute top-16 right-8 z-50 bg-white w-[360px] border rounded-xl shadow-lg p-4">

      <p className="font-semibold mb-4 text-gray-700">Event Types</p>

      {/* ONE ON ONE */}
      <div
        onClick={() => onSelect("one")}
        className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
      >
        <p className="text-blue-600 font-medium">One-on-one</p>
        <p className="text-sm text-gray-500">
          1 host → 1 invitee
        </p>
        <p className="text-xs text-gray-400">
          Good for coffee chats, 1:1 interviews
        </p>
      </div>

      {/* GROUP */}
      <div className="p-3 rounded-lg opacity-50 cursor-not-allowed">
        <p className="font-medium">Group</p>
        <p className="text-sm">Multiple invitees</p>
      </div>

      {/* ROUND ROBIN */}
      <div className="p-3 rounded-lg opacity-50 cursor-not-allowed">
        <p className="font-medium">Round robin</p>
        <p className="text-sm">Distribute meetings</p>
      </div>

      <hr className="my-3" />

      <p className="text-sm text-gray-500">Admin Templates</p>
      <p className="text-sm text-gray-500">More ways to meet</p>
    </div>
  );
}