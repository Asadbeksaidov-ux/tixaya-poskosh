#!/bin/bash
set -e

echo "Updating packages..."
apt-get update -y

echo "Installing Nginx, Curl, UFW..."
apt-get install -y nginx curl ufw unzip

echo "Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo "Installing PM2 globally..."
npm install -g pm2

echo "Extracting application..."
mkdir -p /var/www/tixaya-poskosh
tar -xzf /root/app.tar.gz -C /var/www/tixaya-poskosh

echo "Installing dependencies..."
cd /var/www/tixaya-poskosh
npm install

echo "Building Next.js application..."
npm run build

echo "Starting application with PM2..."
pm2 start npm --name "tixaya-poskosh" -- run start
pm2 save
pm2 startup | tail -n 1 | bash

echo "Configuring Nginx..."
cat << 'EOF' > /etc/nginx/sites-available/tixaya-poskosh
server {
    listen 80;
    server_name tihayaroskosh.ru www.tihayaroskosh.ru 80.78.248.89;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

ln -sf /etc/nginx/sites-available/tixaya-poskosh /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

echo "Configuring Firewall..."
ufw --force enable
ufw allow ssh
ufw allow 'Nginx Full'

echo "Deployment Script Completed!"
