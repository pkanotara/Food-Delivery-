# Deployment Guide

## Prerequisites
- Node.js installed on server
- MongoDB Atlas account
- Stripe account
- Domain name (optional)

## Backend Deployment

### Option 1: Deploy to Heroku
1. Install Heroku CLI
2. Login to Heroku: `heroku login`
3. Create new app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set STRIPE_SECRET_KEY=your_stripe_key
   heroku config:set CLIENT_URL=your_frontend_url
   ```
5. Deploy: `git push heroku main`

### Option 2: Deploy to Railway
1. Connect your GitHub repository
2. Select backend directory
3. Add environment variables in Railway dashboard
4. Deploy automatically on push

### Option 3: Deploy to DigitalOcean/AWS
1. Set up a Node.js server
2. Clone repository
3. Install dependencies: `npm install`
4. Set up environment variables
5. Use PM2 to run the app: `pm2 start server.js`
6. Configure Nginx as reverse proxy

## Frontend Deployment

### Option 1: Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend directory
3. Run: `vercel`
4. Set environment variables in Vercel dashboard
5. Deploy: `vercel --prod`

### Option 2: Deploy to Netlify
1. Build the app: `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Or connect GitHub repository for automatic deployments
4. Set environment variables in Netlify dashboard

## Admin Panel Deployment
Follow the same steps as Frontend deployment, but use the admin directory

## Environment Variables

### Production Backend
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/food-delivery
JWT_SECRET=strong_random_secret_key
STRIPE_SECRET_KEY=sk_live_your_live_key
PORT=4000
CLIENT_URL=https://your-frontend-domain.com
NODE_ENV=production
```

### Production Frontend & Admin
```env
VITE_API_URL=https://your-backend-domain.com
```

## Post-Deployment Checklist
- [ ] Test all API endpoints
- [ ] Verify authentication works
- [ ] Test payment flow with Stripe test cards
- [ ] Check file upload functionality
- [ ] Test admin panel features
- [ ] Verify responsive design on different devices
- [ ] Set up SSL certificates (Let's Encrypt recommended)
- [ ] Configure CORS for production domains
- [ ] Set up monitoring and logging
- [ ] Create backup strategy for database
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure CDN for static assets (optional)

## Database Setup
1. Create MongoDB Atlas cluster
2. Whitelist your server's IP address
3. Create database user with read/write permissions
4. Get connection string
5. Enable MongoDB encryption at rest
6. Set up regular backups

## SSL Configuration (Nginx)
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Monitoring
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure application monitoring (New Relic, DataDog)
- Set up log aggregation (Loggly, Papertrail)
- Monitor database performance
- Track API response times
- Set up alerts for errors and downtime
