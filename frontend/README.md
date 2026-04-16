# 📅 Calendly Clone — Frontend (Next.js)

A modern, responsive, and interactive frontend for a full-stack Calendly-inspired scheduling application. Built with **Next.js 14**, **Tailwind CSS**, and integrated with our custom Node.js/PostgreSQL backend API.

---

## ✨ Key Features

- **Dynamic Event Creation:** Intuitive UI for creating and managing event types (e.g., One-on-One, Group).
- **Interactive Booking Flow:** A seamless user-facing booking page with real-time calendar date and time slot selection.
- **Availability Management:** Weekly schedule management interface to define available working hours easily.
- **Meetings Dashboard:** A clean, organized centralized hub to view all upcoming and past bookings.
- **Responsive Design:** Pixel-perfect mobile and desktop layouts powered by Tailwind CSS.

---

## 💻 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Date Handling:** [date-fns](https://date-fns.org/)
- **HTTP Client:** [Axios](https://axios-http.com/)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **Backend Running:** Make sure the Node.js backend is running locally on port `5000` (or as configured).

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root of the frontend directory and add your API URL (if required by your axios configuration):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the scheduling app.

---

## 📁 Project Structure highlights

- `src/app/` — Next.js 14 App Router pages (`dashboard`, `book`, `availability`, `meetings`, etc.)
- `src/components/` — Reusable React UI components (Calendars, Modals, Forms)
- `src/utils/` or `src/lib/` — Helper functions, API/axios interceptors, and date parsing utilities.

---

## 🔮 Future Improvements

- **Google Calendar Integration:** Showing synced free/busy times in the booking calendar.
- **Web Conferencing:** Auto-generating Zoom/Google Meet links upon confirmation.
- **Team Scheduling:** Implementing Round Robin logic for team-based event types.
- **Email Notifications:** automated confirmation & reminder emails natively through the app.

---

## 🤝 Contributing / Customization
Feel free to modify the internal pages, swap out `lucide-react` for your own icons, or customize `tailwind.config.js` to match your personalized brand's look and feel.
