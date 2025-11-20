# 🚀 Complete Installation Guide - MyScheme MERN

This guide will walk you through setting up the MyScheme MERN application from scratch.

## 📋 Prerequisites

Before starting, make sure you have:

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **MongoDB Database** (Choose one option):
   - **Option A - MongoDB Atlas (Recommended):** Free cloud database
   - **Option B - Local MongoDB:** Install on your machine

4. **Git** (optional, for cloning)
   - Download from: https://git-scm.com/

## 🎯 Step-by-Step Installation

### Step 1: Get the Code

**Option A - Clone from GitHub:**
```bash
git clone https://github.com/Parteek04/myscheme-mern.git
cd myscheme-mern
```

**Option B - Download ZIP:**
1. Go to: https://github.com/Parteek04/myscheme-mern
2. Click "Code" → "Download ZIP"
3. Extract and open the folder in terminal

### Step 2: Install Dependencies

Run this command in the project root directory:

```bash
npm run install-all
```

This will install dependencies for:
- ✅ Root project (concurrently)
- ✅ Server (Express, MongoDB, etc.)
- ✅ Client (React, Vite, etc.)

**Alternative - Manual Installation:**
```bash
# Root dependencies
npm install

# Server dependencies
cd server
npm install
cd ..

# Client dependencies  
cd client
npm install
cd ..
```

### Step 3: Setup MongoDB Database

Choose one of these options:

#### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string, it looks like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/myscheme?retryWrites=true&w=majority
   ```

#### Option B: Local MongoDB

1. Download from: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Your connection string will be:
   ```
   mongodb://localhost:27017/myscheme
   ```

### Step 4: Configure Environment Variables

**This is the most critical step! The server will NOT start without this.**

1. **Navigate to server folder:**
   ```bash
   cd server
   ```

2. **Create .env file from template:**
   
   **Windows PowerShell:**
   ```powershell
   Copy-Item .env.example .env
   ```
   
   **Mac/Linux:**
   ```bash
   cp .env.example .env
   ```

3. **Edit the .env file:**
   
   Open `server/.env` in your text editor and update:
   
   ```env
   # MongoDB Connection - REPLACE THIS WITH YOUR CONNECTION STRING
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myscheme?retryWrites=true&w=majority
   
   # JWT Secret - You can keep this or generate a new one
   JWT_SECRET=myscheme_super_secret_jwt_key_2024_change_this_in_production
   
   # Server Port
   PORT=5000
   
   # Node Environment
   NODE_ENV=development
   
   # Client URL for CORS
   CLIENT_URL=http://localhost:5173
   ```

4. **Go back to root directory:**
   ```bash
   cd ..
   ```

### Step 5: Seed the Database

This creates sample data (categories, schemes, and test users):

```bash
cd server
npm run seed
cd ..
```

You should see output like:
```
✅ Connected to MongoDB
✅ Database cleared
✅ 8 categories created
✅ 13 schemes created  
✅ 2 users created
✅ Seeding completed successfully!
```

**If you get duplicate key errors:**
```bash
cd server
npm run reseed
cd ..
```

### Step 6: Start the Application

From the root directory:

```bash
npm run dev
```

This starts both:
- ✅ Backend API: http://localhost:5000
- ✅ Frontend: http://localhost:5173

**Alternative - Start Separately:**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

### Step 7: Access the Application

Open your browser and go to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api/health

## 🔑 Test Login Credentials

### Admin Account
- **Email:** admin@myscheme.com
- **Password:** admin123
- **Access:** Full admin panel, manage schemes & categories

### Regular User Account
- **Email:** user@test.com
- **Password:** user123
- **Access:** Browse schemes, save favorites, manage profile

## ✅ Verify Everything Works

1. ✅ Frontend loads at http://localhost:5173
2. ✅ You can see schemes on the homepage
3. ✅ Login with admin credentials works
4. ✅ Admin panel is accessible
5. ✅ You can search and filter schemes

## ⚠️ Common Issues & Solutions

### Issue: "Cannot find module" errors
**Solution:** Make sure you ran `npm run install-all` or installed dependencies in all three locations (root, server, client)

### Issue: Server won't start - "MONGODB_URI is not defined"
**Solution:** You forgot Step 4! Create `server/.env` file with your MongoDB connection string

### Issue: "Connection refused" or MongoDB connection fails
**Solution:** 
- Check your MongoDB connection string is correct in `server/.env`
- If using Atlas, make sure your IP is whitelisted (or allow from anywhere: 0.0.0.0/0)
- If using local MongoDB, make sure the service is running

### Issue: Port 5000 or 5173 already in use
**Solution:** Kill the process using that port

**Windows PowerShell:**
```powershell
# Kill process on port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Kill process on port 5173
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process
```

**Mac/Linux:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Issue: Seed script fails with duplicate key error
**Solution:** Run the reseed script instead:
```bash
cd server
npm run reseed
cd ..
```

### Issue: Frontend can't connect to backend (CORS errors)
**Solution:** 
- Make sure backend is running on port 5000
- Check that `CLIENT_URL` in `server/.env` is set to `http://localhost:5173`
- Restart both servers after changing .env

## 🎉 Success!

You should now have:
- ✅ Backend API running on port 5000
- ✅ Frontend running on port 5173
- ✅ MongoDB database with sample data
- ✅ Admin and user accounts to test with

## 📚 Next Steps

- Read [QUICKSTART.md](QUICKSTART.md) for feature overview
- Read [API_GUIDE.md](API_GUIDE.md) for API documentation
- Read [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions

## 💡 Tips

1. **Keep terminals open:** You need both frontend and backend running
2. **Use admin account:** To access the admin panel and manage schemes
3. **Check server/.env:** Most issues come from missing or incorrect environment variables
4. **MongoDB Atlas:** Remember to whitelist your IP address in Atlas dashboard

## 🆘 Still Having Issues?

1. Check that Node.js version is 16 or higher: `node --version`
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall:
   ```bash
   rm -rf node_modules client/node_modules server/node_modules
   npm run install-all
   ```
4. Make sure `.env` file exists in `server/` folder (not in root!)
5. Check that MongoDB is accessible from your network

## 📝 File Checklist

After installation, you should have these key files:
- ✅ `server/.env` (created from .env.example)
- ✅ `node_modules/` (in root, server, and client)
- ✅ `package-lock.json` (in root, server, and client)

---

**Ready to start developing?** 🚀

Check out [QUICKSTART.md](QUICKSTART.md) to learn what features are available!
