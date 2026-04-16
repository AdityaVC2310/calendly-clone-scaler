"use client";

import { useState } from 'react';
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
  addDays, 
  eachDayOfInterval,
  isBefore,
  startOfDay
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Calendar({ selectedDate, onSelectDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "MMMM yyyy";
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
  const today = startOfDay(new Date());

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="text-lg font-medium text-slate-800">
          {format(currentDate, dateFormat)}
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-slate-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, i) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isPast = isBefore(day, today);
          const isToday = isSameDay(day, today);

          return (
            <div key={i} className="aspect-square flex items-center justify-center p-1">
              <button
                onClick={() => !isPast && onSelectDate(day)}
                disabled={isPast || !isCurrentMonth}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                  ${!isCurrentMonth ? 'text-slate-300 cursor-default' : ''}
                  ${isCurrentMonth && isPast ? 'text-slate-300 cursor-not-allowed' : ''}
                  ${isCurrentMonth && !isPast && !isSelected ? 'text-primary-dark hover:bg-slate-100 bg-slate-50 border border-transparent' : ''}
                  ${isSelected ? 'bg-primary text-white shadow-md' : ''}
                  ${isToday && !isSelected ? 'border border-primary text-primary' : ''}
                `}
              >
                {format(day, 'd')}
              </button>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 flex items-center items-center text-sm text-slate-500 justify-center">
        <span>Time zone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
      </div>
    </div>
  );
}
