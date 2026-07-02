# Ruchi Studio Backend

Node.js + Express + MongoDB Atlas API for the Ruchi Resin Art portfolio website.

## Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Configure `.env` (already created with your MongoDB Atlas credentials):
   - `MONGODB_URI` — MongoDB Atlas connection string (password `@` must be URL-encoded as `%40`)
   - `JWT_SECRET` — secret for admin auth tokens
   - `ADMIN_USERNAME` / `ADMIN_PASSWORD` — initial admin login credentials

3. Seed the database with existing site content:
   ```bash
   npm run seed
   ```

4. Start the API server:
   ```bash
   npm run dev
   ```
   Server runs at **http://localhost:5000**

## Admin Login Credentials

| Field    | Value              |
|----------|--------------------|
| URL      | http://localhost:5174/admin |
| Username | `ruchi`            |
| Password | `Ruchi@Admin2026`  |

## API Endpoints

- `GET /api/site` — public site data (content, gallery, testimonials, etc.)
- `POST /api/contact` — contact form submission
- `POST /api/auth/login` — admin login
- `PUT /api/admin/*` — protected admin CRUD routes

## Running Full Stack

Terminal 1 — Backend:
```bash
cd backend && npm run dev
```

Terminal 2 — Frontend:
```bash
cd protfolio && npm run dev
```

The Vite dev server proxies `/api` and `/uploads` to the backend.
