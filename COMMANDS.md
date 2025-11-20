# 🚀 Quick Setup Commands - MyScheme MERN

Copy and paste these commands in order to set up and run the project.

---

## Step 1: Clone the Repository (if not already done)

```bash
git clone https://github.com/Parteek04/myscheme-mern.git
cd myscheme-mern
```

---

## Step 2: Install All Dependencies

```bash
npm run install-all
```

**OR install manually:**

```bash
npm install
cd server
npm install
cd ..
cd client
npm install
cd ..
```

---

## Step 3: Create Environment File

**Windows PowerShell:**
```powershell
cd server
Copy-Item .env.example .env
cd ..
```

**Mac/Linux:**
```bash
cd server
cp .env.example .env
cd ..
```

---

## Step 4: Edit .env File

Open `server/.env` in your text editor and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=myscheme_super_secret_jwt_key_2024_change_this_in_production
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

## Step 5: Seed Database

```bash
cd server
npm run seed
cd ..
```

**If you get duplicate errors, use reseed:**
```bash
cd server
npm run reseed
cd ..
```

---

## Step 6: Start the Application

**Option A - Both servers together (Recommended):**
```bash
npm run dev
```

**Option B - Separate terminals:**

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

---

## Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api/health

---

## Login Credentials

**Admin:**
- Email: admin@myscheme.com
- Password: admin123

**User:**
- Email: user@test.com
- Password: user123

---

## Troubleshooting Commands

### Kill Process on Port (if port already in use)

**Windows PowerShell:**
```powershell
# Kill port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Kill port 5173
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process
```

**Mac/Linux:**
```bash
# Kill port 5000
lsof -ti:5000 | xargs kill -9

# Kill port 5173
lsof -ti:5173 | xargs kill -9
```

---

### Clear and Reinstall Everything

```bash
# Remove all node_modules
rm -rf node_modules client/node_modules server/node_modules

# Windows PowerShell alternative:
# Remove-Item -Recurse -Force node_modules, client/node_modules, server/node_modules

# Reinstall all dependencies
npm run install-all
```

---

### Reseed Database (clear and seed fresh)

```bash
cd server
npm run reseed
cd ..
```

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both client and server |
| `npm run client` | Start only frontend |
| `npm run server` | Start only backend |
| `cd server && npm run seed` | Seed database |
| `cd server && npm run reseed` | Clear and reseed database |
| `cd server && npm run clear` | Clear database only |

---

## Verification Checklist

After running all commands:
- [ ] No errors in terminal
- [ ] Frontend accessible at http://localhost:5173
- [ ] Backend accessible at http://localhost:5000
- [ ] Can login with admin credentials
- [ ] Schemes are visible on homepage

---

**Need detailed explanations?** Check [INSTALLATION.md](INSTALLATION.md)
