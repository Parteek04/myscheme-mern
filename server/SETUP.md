# Server Setup Instructions

## ⚙️ Environment Configuration

**IMPORTANT:** Before running the server, you MUST create and configure the `.env` file:

### Step 1: Create .env file

```powershell
# Navigate to server folder
cd server

# Copy the example file to create .env
Copy-Item .env.example .env

# Or on Mac/Linux:
# cp .env.example .env
```

### Step 2: Configure MongoDB Connection

Edit the `server/.env` file and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string_here
```

**Get MongoDB Connection String:**
1. **MongoDB Atlas (Recommended):** 
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get your connection string
2. **Local MongoDB:** Use `mongodb://localhost:27017/myscheme`

## 🚀 Run the Server

```powershell
# Install dependencies (if not already done)
npm install

# Seed the database with sample data
npm run seed

# If you get duplicate key errors, clear and reseed:
npm run reseed

# Start the development server
npm run dev
```

## ✅ Verification

You should see:
```
Server running on port 5000
Connected to MongoDB
```

## 🔐 Environment Variables Explained

- **MONGODB_URI**: MongoDB Atlas connection string (provided)
- **JWT_SECRET**: Secret key for JWT token generation
- **PORT**: Server port (default: 5000)
- **NODE_ENV**: development or production

## ⚠️ Troubleshooting

### Error: "Cannot find module 'dotenv'"
**Solution:** Run `npm install` in the server folder

### Error: "MONGODB_URI is not defined"
**Solution:** Make sure you copied `.env.example` to `.env`

### Error: "E11000 duplicate key error" or "slug_1 dup key"
**Solution:** Database already has data. Clear and reseed:
```powershell
npm run reseed
```
Or manually clear:
```powershell
npm run clear
npm run seed
```

### Error: "MongoServerError: Authentication failed"
**Solution:** The MongoDB credentials might have expired. Create your own MongoDB Atlas account or ask for updated credentials.

### Error: "Port 5000 already in use"
**Solution:** Change PORT in `.env` to another port (e.g., 5001)

## 📱 For Your Own MongoDB (Optional)

If you want to use your own database:

1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Replace `MONGODB_URI` in `.env`
5. Add your IP to whitelist (or use `0.0.0.0/0` for development)

---

**Ready to go!** The server should now run successfully. 🎉
