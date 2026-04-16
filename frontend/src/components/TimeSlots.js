"use client";

export default function TimeSlots({ times, onSelectTime, selectedTime, isBooked }) {
  return (
    <div className="flex flex-col gap-3 pr-2 scrollbar-thin scrollbar-thumb-gray-200">
      {times.map((time) => {
        const booked = isBooked(time);
        const isSelected = selectedTime === time;

        return (
          <button
            key={time}
            disabled={booked}
            onClick={() => onSelectTime(time)}
            className={`w-full py-3.5 rounded-lg border font-bold text-[15px] transition-all
              ${booked ? "border-transparent bg-gray-100 text-gray-400 cursor-not-allowed" : 
                isSelected ? "bg-[#0066FF] border-[#0066FF] text-white shadow-md ring-2 ring-blue-200 ring-offset-1" : 
                "border-[#0066FF] text-[#0066FF] hover:border-blue-700 hover:bg-blue-50"}
            `}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
