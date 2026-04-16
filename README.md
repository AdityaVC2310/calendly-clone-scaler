# 📅 Calendly Clone — Node.js Backend

A production-ready REST API for a Calendly-like scheduling application built with **Express.js**, **Prisma ORM**, and **PostgreSQL**.

---

## 🏗️ Project Structure

```
calendly-clone-backend/
├── server.js                   # Entry point — starts HTTP server
├── src/
│   ├── app.js                  # Express app: middleware + routes
│   ├── config/
│   │   ├── env.js              # Validated env variables
│   │   └── prisma.js           # Singleton Prisma client
│   ├── controllers/            # Handle HTTP req/res, delegate to services
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── eventType.controller.js
│   │   ├── booking.controller.js
│   │   └── availability.controller.js
│   ├── services/               # Business logic
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── eventType.service.js
│   │   ├── scheduling.service.js
│   │   └── availability.service.js
│   ├── routes/                 # Express routers
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── eventType.routes.js
│   │   ├── booking.routes.js
│   │   ├── availability.routes.js
│   │   └── public.routes.js    # Unauthenticated public endpoints
│   ├── middlewares/
│   │   ├── auth.js             # JWT authentication guard
│   │   ├── validate.js         # express-validator error collector
│   │   ├── errorHandler.js     # Global error handler
│   │   └── notFound.js         # 404 handler
│   └── utils/
│       ├── apiResponse.js      # Standard response envelope
│       ├── apiError.js         # Custom error class
│       ├── asyncHandler.js     # Async try/catch wrapper
│       ├── logger.js           # Winston logger
│       └── slugify.js          # URL slug generator
├── prisma/
│   ├── schema.prisma           # Database models
│   └── seed.js                 # Demo seed data
├── logs/                       # Log files (git-ignored)
├── .env                        # Local environment variables
├── .env.example                # Environment variable template
└── nodemon.json                # Hot-reload config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** running locally (or a cloud DB like Supabase / Neon)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and set your `DATABASE_URL` and JWT secrets:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/calendly_clone?schema=public"
JWT_SECRET=your_super_secret_key
JWT_REFRESH_SECRET=another_super_secret_key
```

### 3. Run Database Migrations

```bash
# Create the database tables
npm run db:migrate

# Generate Prisma client (auto-runs after migrate, but explicit is fine too)
npm run db:generate
```

### 4. (Optional) Seed Demo Data

```bash
npm run db:seed
```

This creates:
- User `alice@example.com` / password `Password123`
- Two event types: `30-min-meeting` and `60-min-consultation`
- Mon–Fri 9am–5pm availability

### 5. Start the Server

```bash
# Development (hot-reload)
npm run dev

# Production
npm start
```

---

## 🔌 API Reference

### Base URL
```
http://localhost:5000/api/v1
```

### Health Check
```
GET /health
```

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | ❌ | Register a new user |
| POST | `/auth/login` | ❌ | Login and get tokens |
| POST | `/auth/refresh` | ❌ | Refresh access token |
| GET | `/auth/me` | ✅ | Get current user |

### Users
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/users/:username` | ❌ | Public profile + event types |
| GET | `/users/me/profile` | ✅ | Authenticated user's profile |
| PATCH | `/users/me/profile` | ✅ | Update profile |

### Event Types
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/event-types` | ✅ | Create event type |
| GET | `/event-types` | ✅ | List all event types |
| GET | `/event-types/:id` | ✅ | Get event type by ID |
| PATCH | `/event-types/:id` | ✅ | Update event type |
| DELETE | `/event-types/:id` | ✅ | Delete event type |

### Availability
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PUT | `/availability` | ✅ | Set weekly availability |
| GET | `/availability` | ✅ | Get your availability |

### Public (Booking Flow)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/public/:username/:slug` | ❌ | Get event type for booking |
| GET | `/public/:username/:slug/slots?date=YYYY-MM-DD` | ❌ | Get available time slots |

### Bookings
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/bookings` | ❌ | Book an event (public) |
| GET | `/bookings` | ✅ | List host's bookings |
| GET | `/bookings/:id` | ✅ | Get booking by ID |
| POST | `/bookings/:id/cancel` | ✅/token | Cancel a booking |

---

## 📦 Tech Stack

| Package | Purpose |
|---------|---------|
| `express` | HTTP framework |
| `@prisma/client` + `prisma` | Type-safe ORM + migrations |
| `dotenv` | Environment variable loading |
| `cors` | Cross-Origin Resource Sharing |
| `body-parser` | Request body parsing |
| `helmet` | Security headers |
| `morgan` | HTTP request logging |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT generation & verification |
| `express-validator` | Request validation |
| `winston` | Structured logging |
| `http-status-codes` | Human-readable HTTP codes |
| `uuid` | Token generation |
| `nodemon` | Dev hot-reload |

---

## 🗄️ Database Scripts

```bash
npm run db:migrate        # Apply pending migrations (dev)
npm run db:migrate:prod   # Apply migrations in production
npm run db:generate       # Regenerate Prisma client
npm run db:studio         # Open Prisma Studio GUI
npm run db:seed           # Seed demo data
npm run db:reset          # Drop + recreate + seed
```

---

## 🔐 Authentication

All protected routes require an `Authorization` header:

```
Authorization: Bearer <access_token>
```

Access tokens expire in **15 minutes**. Use the `/auth/refresh` endpoint with your `refreshToken` to get a new access token.

---

## 📊 Data Models

```
User ──< EventType ──< ScheduledEvent
  \──< Availability          \──< InviteeInfo
                              \──< QuestionAnswer
EventType ──< CustomQuestion
```
