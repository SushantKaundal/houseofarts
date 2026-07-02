# House Of Arts

Resin art portfolio website with Node.js backend, MongoDB Atlas, and admin panel.

## Project structure

```
houseofarts/
├── protfolio/    # React + Vite frontend
├── backend/      # Express + MongoDB API
└── README.md
```

## Local development

**Backend:**
```bash
cd backend
npm install
cp .env.example .env   # edit with your MongoDB URI
npm run seed
npm run dev
```

**Frontend:**
```bash
cd protfolio
npm install
npm run dev
```

- Website: http://localhost:5173
- Admin: http://localhost:5173/admin
- API: http://localhost:5000/api

## Admin credentials

| Field | Value |
|-------|-------|
| Username | `ruchi` |
| Password | `Ruchi@Admin2026` |

## Production

- **Backend:** AWS EC2 `16.171.160.23` (port 5000)
- **Frontend:** Deploy `protfolio/` folder to Vercel
- **Database:** MongoDB Atlas

### Vercel deployment (your last step)

1. Go to [vercel.com](https://vercel.com) → Import `kaundalwork/houseofarts`
2. Set **Root Directory** to `protfolio`
3. Deploy — `vercel.json` already proxies `/api` and `/uploads` to the EC2 backend

### EC2 backend

Managed with PM2. To update after pushing to GitHub:

```bash
ssh -i houseofarts.pem ec2-user@16.171.160.23
cd ~/houseofarts && git pull
cd backend && npm install && pm2 restart houseofarts-api
```
