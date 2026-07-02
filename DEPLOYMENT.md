# House Of Arts — Deployment Guide

## What is already done

| Step | Status |
|------|--------|
| Git repo initialized locally | Done |
| Code committed on `main` branch | Done |
| Backend deployed to AWS EC2 | Done (needs 2 fixes below) |
| Node.js 20 + PM2 installed on EC2 | Done |
| `vercel.json` created for frontend | Done |
| Push to GitHub | **You need to do this** (see below) |

---

## 1. Push code to GitHub (your action)

Git push failed because this PC is logged into GitHub as `SushantKaundal`, but the repo is under `kaundalwork`.

**Option A — Log in as kaundalwork and push:**
```bash
cd C:\Users\Admin\Desktop\ruchi
git remote -v
git push -u origin main
```
Sign in as **kaundalwork** when prompted.

**Option B — Use GitHub Desktop or personal access token:**
```bash
git remote set-url origin https://kaundalwork:<YOUR_TOKEN>@github.com/kaundalwork/houseofarts.git
git push -u origin main
```

**Repo URL:** https://github.com/kaundalwork/houseofarts

---

## 2. Fix MongoDB Atlas (required for backend to work)

EC2 cannot connect to MongoDB yet. Add the server IP to Atlas:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) → **Network Access**
2. Click **Add IP Address**
3. Add: `16.171.160.23` (your EC2 public IP)
   - Or use `0.0.0.0/0` (allow all — easier but less secure)
4. Save

Then SSH into EC2 and restart:
```bash
ssh -i houseofarts.pem ec2-user@16.171.160.23
cd ~/houseofarts/backend
npm run seed
pm2 restart houseofarts-api
curl http://localhost:5000/api/health
```

You should see: `{"status":"ok","message":"Ruchi Studio API"}`

---

## 3. Open EC2 port 5000 (required for Vercel to reach API)

In AWS Console → EC2 → **Security Groups** → `launch-wizard-1`:

| Type | Port | Source |
|------|------|--------|
| Custom TCP | 5000 | 0.0.0.0/0 |

Save the rule.

Test from your browser: http://16.171.160.23:5000/api/health

---

## 4. Deploy frontend to Vercel (your last step)

1. Push code to GitHub first (step 1)
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import `kaundalwork/houseofarts`
4. Set **Root Directory** to `protfolio`
5. Click **Deploy**

`vercel.json` is already configured to proxy:
- `/api/*` → `http://16.171.160.23:5000/api/*`
- `/uploads/*` → `http://16.171.160.23:5000/uploads/*`

After deploy, update EC2 `.env` with your real Vercel URL:
```bash
# On EC2
nano ~/houseofarts/backend/.env
# Change CLIENT_URL to your actual Vercel URL, e.g.:
# CLIENT_URL=https://houseofarts.vercel.app
pm2 restart houseofarts-api
```

---

## Server details

| Item | Value |
|------|-------|
| EC2 Public IP | `16.171.160.23` |
| EC2 Instance | `HouseOfArts` (t3.micro, eu-north-1) |
| SSH Key | `houseofarts.pem` |
| SSH Command | `ssh -i houseofarts.pem ec2-user@16.171.160.23` |
| API URL (production) | `http://16.171.160.23:5000` |
| Backend path on EC2 | `/home/ec2-user/houseofarts/backend` |
| Process manager | PM2 (`houseofarts-api`) |

---

## Admin panel (production)

Once Vercel is live:
- **URL:** `https://your-vercel-url.vercel.app/admin`
- **Username:** `ruchi`
- **Password:** `Ruchi@Admin2026`

---

## Useful commands on EC2

```bash
pm2 status                    # check if API is running
pm2 logs houseofarts-api      # view logs
pm2 restart houseofarts-api   # restart after .env changes
cd ~/houseofarts/backend && git pull && npm install && pm2 restart houseofarts-api  # after GitHub push
```
