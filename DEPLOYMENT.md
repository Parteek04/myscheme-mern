# 🚀 Deployment Guide - MyScheme MERN Application

## Table of Contents
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Backend Deployment (Render)](#backend-deployment-render)
- [Database Setup (MongoDB Atlas)](#database-setup-mongodb-atlas)
- [Environment Variables](#environment-variables)
- [Post-Deployment Steps](#post-deployment-steps)
- [Alternative Platforms](#alternative-platforms)

---

## 🎨 Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Step 1: Prepare Frontend for Deployment

1. **Update API base URL:**
   
   Edit `client/src/utils/axios.js`:
   ```javascript
   const API = axios.create({
     baseURL: import.meta.env.VITE_API_URL || '/api',
     // ... rest of config
   });
   ```

2. **Create `.env.production` in client folder:**
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

3. **Test production build locally:**
   ```bash
   cd client
   npm run build
   npm run preview
   ```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to client folder
cd client

# Deploy
vercel

# Follow prompts:
# - Set up and deploy: Yes
# - Which scope: Your account
# - Link to existing project: No
# - Project name: myscheme-client
# - Directory: ./
# - Override settings: No
```

#### Option B: Using Vercel Dashboard

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/myscheme.git
   git push -u origin main
   ```

2. **Import Project on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Vite
     - Root Directory: `client`
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Add Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

---

## 🖥️ Backend Deployment (Render)

### Prerequisites
- GitHub account
- Render account (free tier available)

### Step 1: Prepare Backend for Deployment

1. **Update CORS configuration in `server/server.js`:**
   ```javascript
   app.use(cors({
     origin: [
       'http://localhost:5173',
       'https://your-frontend.vercel.app'
     ],
     credentials: true
   }));
   ```

2. **Ensure `server/package.json` has start script:**
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js",
       "seed": "node scripts/seedData.js"
     }
   }
   ```

3. **Create `.gitignore` if not exists:**
   ```
   node_modules/
   .env
   .env.local
   ```

### Step 2: Deploy to Render

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Create Web Service on Render:**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `myscheme-backend`
     - Region: Choose closest to your users
     - Branch: `main`
     - Root Directory: `server`
     - Runtime: Node
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Instance Type: Free

3. **Add Environment Variables:**
   ```env
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-secure-random-string-here
   PORT=5000
   NODE_ENV=production
   CLIENT_URL=https://your-frontend.vercel.app
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (takes 5-10 minutes)
   - Your API will be live at `https://your-service.onrender.com`

### Step 3: Seed Database (Optional)

After deployment, run seed script:

```bash
# Using Render Shell
# Go to your service → Shell tab
npm run seed
```

Or use a one-time job:
- Create a new "Background Worker"
- Command: `npm run seed`
- Run once and delete

---

## 🗄️ Database Setup (MongoDB Atlas)

### Your Current Setup
Your database is already configured with:
```
mongodb+srv://Parteek:67xvvSpbJdK4fOrB@test0.gagdjex.mongodb.net/
```

### Security Best Practices

1. **Update Network Access:**
   - Go to MongoDB Atlas Dashboard
   - Network Access → Add IP Address
   - For Render: Add `0.0.0.0/0` (or Render's IP range)

2. **Create Separate Database User (Recommended):**
   - Database Access → Add New Database User
   - Create production user with read/write access
   - Update `MONGODB_URI` with new credentials

3. **Enable Backup:**
   - Clusters → Configure
   - Enable Cloud Backup (free tier)

---

## 🔐 Environment Variables Summary

### Frontend (Vercel)
```env
VITE_API_URL=https://myscheme-backend.onrender.com/api
```

### Backend (Render)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myscheme?retryWrites=true&w=majority
JWT_SECRET=super-secure-random-string-change-in-production-12345
PORT=5000
NODE_ENV=production
CLIENT_URL=https://myscheme-frontend.vercel.app
```

### Generating Secure JWT Secret
```bash
# In PowerShell
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([guid]::NewGuid().ToString()))

# Or online: https://generate-secret.vercel.app/32
```

---

## ✅ Post-Deployment Steps

### 1. Test API Endpoints
```bash
# Check health
curl https://your-backend.onrender.com/api/health

# Test login
curl -X POST https://your-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@myscheme.com","password":"admin123"}'
```

### 2. Test Frontend
- Visit your Vercel URL
- Register a new user
- Login
- Browse schemes
- Test search functionality
- Try admin features

### 3. Update Frontend with Backend URL
If you deployed backend first:
1. Copy backend URL from Render
2. Update Vercel environment variable
3. Redeploy frontend

### 4. Enable Custom Domain (Optional)

**Vercel:**
- Project Settings → Domains
- Add your domain
- Update DNS records as instructed

**Render:**
- Service → Settings → Custom Domain
- Add domain and configure DNS

---

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **Automatic Deployment:**
   - Vercel: Deploys on every push to `main`
   - Render: Deploys on every push to `main`

3. **Monitor Deployments:**
   - Check deployment logs on respective platforms
   - Fix any build errors

---

## 🆓 Alternative Platforms

### Frontend Alternatives

#### **Netlify**
```bash
npm install -g netlify-cli
cd client
npm run build
netlify deploy --prod --dir=dist
```

#### **GitHub Pages**
1. Install: `npm install gh-pages --save-dev`
2. Add to `package.json`:
   ```json
   "homepage": "https://username.github.io/myscheme",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Deploy: `npm run deploy`

### Backend Alternatives

#### **Railway**
- Similar to Render
- $5/month credit on free tier
- Better cold start times

#### **Heroku**
- Classic platform
- Free tier discontinued
- Eco dynos: $5/month

#### **DigitalOcean App Platform**
- $5/month minimum
- Better performance than free tiers

---

## 🐛 Common Deployment Issues

### Issue 1: Build Fails on Vercel
**Solution:**
```bash
# Check Node version in package.json
"engines": {
  "node": "18.x"
}
```

### Issue 2: CORS Errors
**Solution:** Update backend CORS configuration:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
```

### Issue 3: MongoDB Connection Timeout
**Solution:**
- Add `0.0.0.0/0` to MongoDB Atlas IP whitelist
- Check connection string format
- Ensure network access is configured

### Issue 4: Environment Variables Not Working
**Solution:**
- Vercel: Redeploy after adding env vars
- Render: Restart service after adding env vars
- Check variable names (case-sensitive)

### Issue 5: Cold Start Delay (Render Free Tier)
**Issue:** Service sleeps after 15 minutes of inactivity
**Solutions:**
- Upgrade to paid tier ($7/month)
- Use cron job to ping every 14 minutes
- Set up UptimeRobot to keep it awake

---

## 📊 Monitoring & Analytics

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `client/src/main.jsx`:
```javascript
import { Analytics } from '@vercel/analytics/react';

// Add <Analytics /> component
```

### Error Tracking
- **Sentry:** Real-time error tracking
- **LogRocket:** Session replay
- **New Relic:** Application monitoring

---

## 💰 Cost Estimation

### Free Tier (Development/Small Projects)
- **Vercel:** Free (Hobby plan)
- **Render:** Free (with limitations)
- **MongoDB Atlas:** Free (512MB storage)
- **Total:** $0/month

### Paid Tier (Production)
- **Vercel Pro:** $20/month
- **Render Standard:** $7/month (per service)
- **MongoDB M10:** $9/month
- **Total:** ~$36/month

---

## 🔒 Security Checklist

- [ ] Updated JWT_SECRET for production
- [ ] HTTPS enabled on both frontend and backend
- [ ] CORS properly configured
- [ ] MongoDB IP whitelist configured
- [ ] Sensitive data not in Git repository
- [ ] Rate limiting enabled (optional)
- [ ] Helmet.js security headers enabled
- [ ] Environment variables secured

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [MERN Deployment Guide](https://www.mongodb.com/languages/mern-stack-tutorial)

---

**Congratulations! Your MyScheme application is now live! 🎉**

Need help? Check the logs on your deployment platform or refer to the troubleshooting section.
