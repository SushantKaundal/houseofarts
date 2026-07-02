#!/bin/bash
set -e

echo "=== House Of Arts Backend Setup ==="

# Node.js 20
if ! command -v node &> /dev/null; then
  curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
  sudo dnf install -y nodejs
fi

# PM2
if ! command -v pm2 &> /dev/null; then
  sudo npm install -g pm2
fi

# Clone or pull repo
if [ -d "$HOME/houseofarts" ]; then
  cd "$HOME/houseofarts" && git pull
else
  git clone https://github.com/kaundalwork/houseofarts.git "$HOME/houseofarts"
fi

cd "$HOME/houseofarts/backend"
npm install --production

# Create .env if missing
if [ ! -f .env ]; then
  cat > .env << 'ENVEOF'
PORT=5000
MONGODB_URI=mongodb+srv://ruchi:ruchi%4016@cluster0.jum7rva.mongodb.net/ruchi-studio?appName=Cluster0
JWT_SECRET=ruchi-studio-jwt-secret-2026-change-in-production
ADMIN_EMAIL=ruchi@handsel.studio
ADMIN_USERNAME=ruchi
ADMIN_PASSWORD=Ruchi@Admin2026
CLIENT_URL=https://houseofarts.vercel.app
ENVEOF
  echo ".env created"
fi

mkdir -p uploads
npm run seed || true

pm2 delete houseofarts-api 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ec2-user --hp /home/ec2-user 2>/dev/null || true

echo "=== Done! API running on port 5000 ==="
pm2 status
