# Todo + Calendar Full-Stack App

Production-ready starter for a mobile-responsive Todo + Calendar application with a rule-based chatbot.

## Stack
- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Express + TypeScript (MVC)
- **DB:** PostgreSQL
- **Auth:** JWT via httpOnly cookies (access + refresh)
- **Calendar:** FullCalendar (month/week/day + drag/drop)

## Monorepo Structure
```
.
├── client/
└── server/
```

## Features
- Login/Register/Session persist via cookies
- Protected routes and auth context
- Todo CRUD with priority/status/due date/recurrence
- Search + filter + sort + pagination API support
- Calendar views with drag/drop rescheduling + date-click create
- Rule-based chatbot (`POST /chat`) for planning and task/event creation suggestions
- Dark/light theme toggle
- Mobile-first UI with desktop sidebar + mobile bottom nav
- Toast notifications, loading skeletons, empty states
- Swagger docs endpoint (`/docs`)
- Rate-limited auth routes, validation (Zod), centralized error handling

## Setup

### 1) Install dependencies
```bash
npm install
npm install -w server
npm install -w client
```

### 2) Configure env
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### 3) Database
Create a PostgreSQL database and apply schema:
```bash
psql "$DATABASE_URL" -f server/sql/schema.sql
```

### 4) Seed demo data
```bash
npm run seed -w server
```
Demo login: `demo@example.com` / `password123`

### 5) Run apps
In separate terminals:
```bash
npm run dev -w server
npm run dev -w client
```

## API Overview
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`
- `GET/POST/PATCH/DELETE /todos`
- `GET/POST/PATCH/DELETE /events`
- `POST /chat`

## Chatbot Commands
Supported examples:
- `what should I do now`
- `plan my day`
- `plan my tomorrow`
- `show high priority`
- `show overdue`
- `add task buy milk tomorrow`
- `meeting at 5pm`
- `move low priority`
- `reschedule today`

## Notes
- Refresh token rotation is scaffolded with dual token cookies and extensible middleware/service layout.
- Docker can be added on top of this layout if needed.
