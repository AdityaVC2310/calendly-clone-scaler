"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Globe } from 'lucide-react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function BookingForm({ 
  eventDetails, 
  selectedDate, 
  selectedSlot, 
  onBack 
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // We assume selectedSlot could be an object with originalTime or just a time string
  const startTimeLabel = typeof selectedSlot === 'string' ? selectedSlot : format(new Date(selectedSlot), 'h:mm a');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Format startTime for API. Suppose selectedSlot provides full ISO string 
    // or we combine selectedDate and selectedSlot (if time string)
    let startTime;
    if (typeof selectedSlot === 'string' || typeof selectedSlot === 'object') {
      // For simplicity, let's assume we can construct an ISO string if it's a date + time string
      // In a real app we would have the exact start time in ISO format from the slot availability endpoint.
      // E.g., slots API returns ["2026-04-15T10:00:00Z"]
      startTime = typeof selectedSlot === 'string' ? selectedSlot : selectedSlot.time || selectedSlot;
    }

    try {
      const payload = {
        hostUsername: eventDetails.user?.username || 'host', // Assuming backend provides it or we grab hostUsername from slug
        eventTypeSlug: eventDetails.slug,
        startTime,
        timezone,
        inviteeInfo: {
          name: formData.name,
          email: formData.email,
        }
      };
      
      const response = await api.post('/bookings', payload);
      const bookingData = response.data?.data || response.data;
      
      // Navigate to confirmation page
      // Store info locally or query string so the success page can read it
      localStorage.setItem('recentBooking', JSON.stringify({
        ...bookingData,
        eventName: eventDetails.title,
        date: format(selectedDate, 'EEEE, MMMM d, yyyy'),
        time: startTimeLabel
      }));
      
      router.push('/confirmation');
      
    } catch (err) {
      console.error('Booking failed:', err);
      setError('An error occurred while booking. Please try again or choose another time slot.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto my-6">
      <button 
        onClick={onBack}
        className="text-primary hover:text-primary-dark font-medium mb-6 text-sm flex items-center"
      >
        &larr; Back
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">Enter Details</h2>
          <p className="text-slate-500 text-sm mb-6">You're booking a {eventDetails.duration}-minute meeting</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              placeholder="Aditya Chawla"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              placeholder="aditya@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="notes">
              Please share anything that will help prepare for our meeting.
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow resize-none"
              placeholder="Topics to discuss..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto py-3 px-6 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Scheduling...' : 'Schedule Event'}
        </button>
      </form>
    </div>
  );
}
