# HireForge — Frontend

Live demo: https://hireforge-frontend.vercel.app/

## Project Overview
HireForge is a job-application tracker. This repository contains the React + Vite + Tailwind frontend used to view, create, edit and delete job applications. The UI includes a protected admin layout (sidebar + topbar), Dashboard, Applications list and Analytics pages, and a modal to add/edit applications.

This frontend expects a backend REST API (Spring Boot) that exposes authentication and applications CRUD endpoints.

---

## Quick Features
- React + Vite app
- Tailwind CSS for styling
- Protected routes (JWT stored in `localStorage`)
- Dashboard: summary cards, recent applications
- Applications: list, edit, delete
- Analytics: charts (recharts)
- Modal-based application create/edit
- Deployed to Vercel

---

## Environment / Required Variables
Create a `.env` file at the project root (Vite uses `VITE_` prefix):

```
VITE_API_BASE_URL=http://localhost:8080/api
```

When deploying to Vercel set `VITE_API_BASE_URL` to your backend URL (e.g., `https://hireforge-backend.herokuapp.com/api` or your server URL).

---

## Local Development (Frontend)
1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Start dev server:
```bash
npm run dev
```
Open `http://localhost:5173`.

3. Build for production:
```bash
npm run build
```

4. Preview production build locally:
```bash
npm run preview
```

---

## Deployment (Vercel quick steps)
1. Push repository to GitHub.
2. On Vercel, create a new project and import the GitHub repo.
3. Set environment variable `VITE_API_BASE_URL` to your backend API URL in Vercel project settings.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

---

## Routes (client-side)
- `/` — Home / Landing
- `/login` — Login page (public)
- `/dashboard` — Protected — main dashboard
- `/applications` — Protected — full list and management
- `/analytics` — Protected — charts

---

## Important Files / Folders
- `src/App.jsx` — Router and route definitions
- `src/layouts/MainLayout.jsx` — Sidebar + Topbar layout
- `src/pages/Dashboard.jsx` — Dashboard UI
- `src/pages/Applications.jsx` — Applications page
- `src/pages/Analytics.jsx` — Analytics page (recharts)
- `src/components/ApplicationModal.jsx` — Add/Edit modal form
- `src/index.css` — Tailwind imports / base styles
- `tailwind.config.js` — Tailwind config
- `vite.config.js` — Vite config

---

## JWT & Auth Notes
- The app stores JWT token returned by the login API in `localStorage` under the key `token`.
- Protected routes use a `ProtectedRoute` wrapper that checks `localStorage.getItem('token')`.
- API calls should include `Authorization: Bearer <token>` header.

---



## Troubleshooting
- **Blank pages / CSS not applied** — ensure Tailwind build step ran and `index.css` is imported in `main.jsx` / `index.jsx`.
- **403 from backend** — confirm CORS and JWT validation. Make sure backend `CorsConfiguration` allows the frontend origin (e.g., `https://hireforge-frontend.vercel.app`).
- **Login redirects incorrectly** — check `App.jsx` routing logic and `ProtectedRoute` implementation.

---


---
