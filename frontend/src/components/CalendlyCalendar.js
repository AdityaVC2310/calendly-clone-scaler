"use client";

import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
  eachDayOfInterval,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendlyCalendar({ selectedDate, onSelectDate }) {
  const [currentDate, setCurrentDate] = useState(startOfMonth(new Date()));

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  
  const today = startOfDay(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="w-full relative">
      <div className="flex items-center justify-between mb-6 px-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {format(currentDate, "MMMM yyyy")}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-blue-50 text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-blue-50 text-blue-600 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-500 tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 gap-x-1">
        {calendarDays.map((day, i) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isPast = isBefore(day, today);
          const isToday = isSameDay(day, today);

          return (
            <div key={i} className="flex justify-center">
              <button
                onClick={() => !isPast && isCurrentMonth && onSelectDate(day)}
                disabled={isPast || !isCurrentMonth}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200
                  ${!isCurrentMonth ? "text-transparent cursor-default pointer-events-none" : ""}
                  ${isCurrentMonth && isPast ? "text-gray-300 cursor-not-allowed" : ""}
                  ${isCurrentMonth && !isPast && !isSelected ? "text-[#0066FF] bg-blue-50/50 hover:bg-blue-100 border border-transparent" : ""}
                  ${isSelected ? "bg-[#0066FF] text-white shadow-md shadow-blue-200 scale-105" : ""}
                  ${isToday && !isSelected ? "border-2 border-[#0066FF]" : ""}
                `}
              >
                {format(day, "d")}
              </button>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-start text-sm text-gray-500 font-medium">
        <span>Time zone: <span className="text-gray-800">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span></span>
      </div>
    </div>
  );
}
