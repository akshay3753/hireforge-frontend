# HireForge – Frontend

HireForge is a full-stack job application tracking system built with React + Vite and deployed on Vercel.  
It allows users to manage job applications, track interview progress, and view analytics.

## 🔗 Live Demo

Frontend: https://hireforge-frontend.vercel.app  
Backend API: https://hireforge-backend.onrender.com

---

## 🚀 Features

- JWT-based Authentication (Login/Register)
- Protected Routes
- Create / Edit / Delete Applications
- Dashboard Overview
- Analytics (Bar & Pie charts using Recharts)
- Responsive Dark UI
- Deployed on Vercel

---

## 🛠 Tech Stack

- React (Vite)
- Axios (with interceptor for JWT)
- React Router
- Recharts
- Tailwind CSS
- Vercel (Deployment)

---

## 🔐 Authentication Flow

- User logs in
- Backend returns JWT
- Token stored in localStorage
- Axios interceptor attaches token to all API requests
- Protected routes validate token

---

## 📦 Installation (Local Development)

```bash
git clone https://github.com/akshay3753/hireforge-frontend.git
cd hireforge-frontend
npm install
npm run dev

Create .env file:

VITE_API_BASE_URL=http://localhost:8080

🌍 Production Environment Variable

On Vercel:

VITE_API_BASE_URL=https://hireforge-backend.onrender.com

🧠 Key Learnings

Handling JWT authentication in production

Fixing CORS issues

Managing environment variables across environments

Debugging 403 & 500 errors

SPA routing on Vercel using rewrites

Removing hardcoded localhost references

👨‍💻 Author

Akshay Kumar
