# ✅ New User Setup Checklist

Use this checklist to ensure you've completed all steps correctly.

## Before You Start

- [ ] Node.js (v16+) installed - Check: `node --version`
- [ ] npm installed - Check: `npm --version`
- [ ] MongoDB connection string ready (Atlas or local)
- [ ] Git installed (optional) - Check: `git --version`

## Installation Steps

- [ ] **Step 1:** Cloned or downloaded the repository
- [ ] **Step 2:** Ran `npm run install-all` in project root
  - OR installed dependencies manually in root, server, and client
- [ ] **Step 3:** Created `server/.env` from `server/.env.example`
- [ ] **Step 4:** Updated `MONGODB_URI` in `server/.env` with your connection string
- [ ] **Step 5:** Ran `npm run seed` in server folder
- [ ] **Step 6:** Ran `npm run dev` in project root

## Verification Checklist

- [ ] Backend API running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] No error messages in terminal
- [ ] Can access http://localhost:5173 in browser
- [ ] Homepage shows government schemes
- [ ] Can login with admin@myscheme.com / admin123
- [ ] Admin panel is accessible after login

## File Verification

- [ ] `node_modules/` exists in root directory
- [ ] `server/node_modules/` exists
- [ ] `client/node_modules/` exists
- [ ] `server/.env` exists (NOT .env.example!)
- [ ] `server/.env` contains your MongoDB connection string

## Common Mistakes to Avoid

❌ Forgot to create `server/.env` file
✅ Must create from .env.example and add MongoDB URI

❌ Created `.env` in root instead of `server/.env`
✅ The .env file goes in the `server/` folder

❌ Didn't update MONGODB_URI in .env
✅ Replace the placeholder with your actual connection string

❌ Skipped seeding the database
✅ Run `npm run seed` to create sample data

❌ Only installed root dependencies
✅ Run `npm run install-all` or install in all three locations

## Troubleshooting Reference

| Problem | Solution |
|---------|----------|
| Server won't start | Check `server/.env` exists with valid MONGODB_URI |
| "Cannot find module" | Run `npm run install-all` |
| MongoDB connection fails | Verify connection string in `server/.env` |
| Port already in use | Kill process or change port |
| Duplicate key error | Run `npm run reseed` instead |
| CORS errors | Check CLIENT_URL in `server/.env` |

## Need More Help?

📖 Read [INSTALLATION.md](INSTALLATION.md) - Complete step-by-step guide
📖 Read [QUICKSTART.md](QUICKSTART.md) - Quick reference
📖 Read [README.md](README.md) - Project overview

## Success Indicators

When everything is working correctly, you should see:

**Terminal 1 (Backend):**
```
🚀 Server is running on port 5000
📝 Environment: development
✅ Connected to MongoDB
```

**Terminal 2 (Frontend):**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Browser:**
- Homepage loads with schemes
- No console errors
- Can navigate and search
- Login works

---

## Quick Reference

**Start Everything:**
```bash
npm run dev
```

**Start Separately:**
```bash
# Terminal 1
cd server
npm run dev

# Terminal 2  
cd client
npm run dev
```

**Reseed Database:**
```bash
cd server
npm run reseed
```

**Test Accounts:**
- Admin: admin@myscheme.com / admin123
- User: user@test.com / user123

---

✅ **All checked?** You're ready to use the application! 🎉
