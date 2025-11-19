# 🚀 Quick Start Guide - MyScheme MERN Application

## ⚡ Fast Setup (5 Minutes)

### Step 1: Install Dependencies
Open PowerShell and navigate to your project directory:

```powershell
cd c:\Users\kumar\OneDrive\Desktop\mam

# Install all dependencies at once
npm run install-all
```

This will install dependencies for:
- Root project
- Server (backend)
- Client (frontend)

### Step 2: Seed the Database

```powershell
cd server
npm run seed
cd ..
```

This creates:
- ✅ 8 Categories
- ✅ 12 Sample Government Schemes
- ✅ 2 Test Users (Admin & Regular User)

### Step 3: Start the Application

**Option A: Start Both Servers Together (Recommended)**
```powershell
npm run dev
```

**Option B: Start Separately**

Terminal 1 (Backend):
```powershell
cd server
npm run dev
```

Terminal 2 (Frontend):
```powershell
cd client
npm run dev
```

### Step 4: Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

---

## 🔑 Login Credentials

### Admin Access
- **Email:** admin@myscheme.com
- **Password:** admin123
- **Features:** Full admin panel, manage schemes & categories

### User Access
- **Email:** user@test.com
- **Password:** user123
- **Features:** Browse schemes, save favourites, manage profile

---

## 📋 What You Can Do

### As a Regular User:
1. ✅ Browse all government schemes
2. ✅ Search and filter schemes
3. ✅ View detailed scheme information
4. ✅ Save favourite schemes
5. ✅ Update your profile
6. ✅ Get personalized recommendations

### As an Admin:
1. ✅ Access admin dashboard
2. ✅ Add/Edit/Delete schemes
3. ✅ Manage categories
4. ✅ View statistics and analytics
5. ✅ Monitor user activity

---

## 🎯 Test the Features

### 1. Homepage
- Use the search bar to find schemes
- Click on category cards
- View featured schemes

### 2. Browse Schemes
- Apply filters (category, state, age, gender, income)
- Use pagination
- Click on scheme cards for details

### 3. Scheme Details
- View complete information
- Add to favourites (login required)
- Visit official website

### 4. Admin Panel
- Login as admin
- Navigate to `/admin`
- Try creating a new scheme
- Manage categories

---

## 🔧 Troubleshooting

### Port Already in Use
If port 5000 or 5173 is already in use:

1. Edit `server/.env`:
   ```env
   PORT=5001
   ```

2. Edit `client/vite.config.js`:
   ```javascript
   server: {
     port: 5174,
     // ... rest of config
   }
   ```

### MongoDB Connection Error
- Ensure you have internet connectivity
- MongoDB Atlas connection string is already configured
- IP whitelist should allow all IPs (0.0.0.0/0)

### Dependencies Installation Failed
```powershell
# Clear npm cache
npm cache clean --force

# Try installing again
cd server ; npm install ; cd ..
cd client ; npm install ; cd ..
```

---

## 📦 Project Structure Overview

```
mam/
├── server/          # Backend (Node.js + Express)
│   ├── models/      # MongoDB schemas
│   ├── routes/      # API endpoints
│   ├── controllers/ # Business logic
│   └── middleware/  # Auth & validation
│
├── client/          # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/   # Page components
│   │   ├── components/ # Reusable components
│   │   └── redux/   # State management
│   └── ...
│
└── package.json     # Root config
```

---

## 🎨 Key Technologies Used

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 | UI Library |
| Frontend | Vite | Build Tool |
| Frontend | Tailwind CSS | Styling |
| Frontend | Redux Toolkit | State Management |
| Frontend | Axios | HTTP Client |
| Backend | Node.js | Runtime |
| Backend | Express.js | Web Framework |
| Backend | MongoDB | Database |
| Backend | Mongoose | ODM |
| Auth | JWT | Token-based Auth |
| Auth | bcryptjs | Password Hashing |

---

## 💡 Tips for Development

1. **Auto-reload is enabled** - Changes will reflect automatically
2. **Redux DevTools** - Install browser extension for debugging
3. **MongoDB Compass** - Use to view database directly
4. **Postman** - Test API endpoints independently
5. **React DevTools** - Debug React components

---

## 🚀 Next Steps

1. **Customize the UI** - Modify Tailwind classes in components
2. **Add More Schemes** - Use admin panel or edit `seedData.js`
3. **Extend Features** - Add feedback system, notifications, etc.
4. **Deploy** - Use Vercel (frontend) + Render (backend)

---

## 📚 Learn More

- **React Documentation:** https://react.dev
- **Express Guide:** https://expressjs.com
- **MongoDB Manual:** https://docs.mongodb.com
- **Tailwind CSS:** https://tailwindcss.com
- **Redux Toolkit:** https://redux-toolkit.js.org

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Backend server starts without errors
- [ ] Frontend loads at http://localhost:5173
- [ ] Can see schemes on homepage
- [ ] Can login with test credentials
- [ ] Search functionality works
- [ ] Admin panel accessible
- [ ] Can create/edit schemes (admin)
- [ ] Can add schemes to favourites (user)

---

**Need Help?** Check the main README.md for detailed documentation.

**Happy Coding! 🎉**
