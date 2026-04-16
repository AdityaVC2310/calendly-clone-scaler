"use client";

import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek, isWeekend } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarGrid({ selectedDate, onSelectDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth))
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[17px] font-semibold text-gray-800">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <div className="flex gap-1 border border-gray-200 rounded-lg p-1">
          <button onClick={prevMonth} className="p-1 hover:bg-blue-50 text-blue-600 rounded">
            <ChevronLeft className="w-5 h-5"/>
          </button>
          <button onClick={nextMonth} className="p-1 hover:bg-blue-50 text-blue-600 rounded">
            <ChevronRight className="w-5 h-5"/>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-y-2 text-center text-sm mb-2">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
          <div key={day} className="text-[11px] font-bold text-gray-500 tracking-wider mb-2">{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-y-3 text-center">
        {daysInMonth.map((day, idx) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isPast = day < new Date(new Date().setHours(0,0,0,0));
          const weekend = isWeekend(day);
          
          return (
            <div key={idx} className="flex justify-center items-center h-12">
              <button
                disabled={!isCurrentMonth || isPast || weekend}
                onClick={() => onSelectDate(day)}
                className={`w-12 h-12 rounded-full font-bold text-[15px] transition-all
                  ${!isCurrentMonth || isPast || weekend ? "text-gray-300 cursor-not-allowed font-normal" : 
                    isSelected ? "bg-[#0066FF] text-white shadow-md transform scale-110" : 
                    "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }
                `}
              >
                {format(day, "d")}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
}
