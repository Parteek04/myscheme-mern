# 🇮🇳 MyScheme - Government Schemes Portal (MERN Stack)

A full-stack web application similar to MyScheme.gov.in, built with the MERN stack (MongoDB, Express.js, React, Node.js). This platform helps Indian citizens discover and explore government schemes and benefits available to them.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Seeding the Database](#seeding-the-database)
- [API Documentation](#api-documentation)
- [User Credentials](#user-credentials)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

## ✨ Features

### 🔍 **Search & Discovery**
- Advanced search with live suggestions
- Filter by category, state, age, gender, and income group
- Full-text search across schemes
- Pagination and sorting

### 📚 **Scheme Management**
- Detailed scheme information including:
  - Name, description, and benefits
  - Eligibility criteria
  - Required documents
  - Application procedure
  - Official website links
- Category-based organization
- View tracking and popularity metrics

### 👥 **User Features**
- User registration and authentication
- Profile management
- Save schemes to favourites
- Personalized scheme recommendations

### 🔐 **Admin Panel**
- Complete CRUD operations for schemes
- Category management
- Dashboard with statistics
- User management capabilities
- View top-performing schemes

### 🎨 **UI/UX**
- Clean, modern interface inspired by MyScheme.gov.in
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Intuitive navigation

## 🛠 Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **Compression** - Response compression
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
myscheme-mern/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── layout/      # Navbar, Footer
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── admin/       # Admin pages
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminSchemes.jsx
│   │   │   │   └── AdminCategories.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Schemes.jsx
│   │   │   ├── SchemeDetails.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Favourites.jsx
│   │   ├── redux/           # Redux store and slices
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── schemeSlice.js
│   │   │   │   ├── categorySlice.js
│   │   │   │   └── userSlice.js
│   │   │   └── store.js
│   │   ├── utils/           # Utility functions
│   │   │   └── axios.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                   # Node.js backend
│   ├── config/
│   │   └── database.js      # MongoDB connection
│   ├── controllers/         # Request handlers
│   │   ├── authController.js
│   │   ├── schemeController.js
│   │   ├── categoryController.js
│   │   └── userController.js
│   ├── middleware/          # Custom middleware
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── models/              # Mongoose models
│   │   ├── User.js
│   │   ├── Scheme.js
│   │   ├── Category.js
│   │   └── Feedback.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   ├── schemeRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── userRoutes.js
│   ├── scripts/
│   │   └── seedData.js      # Database seeding
│   ├── .env                 # Environment variables
│   ├── .env.example         # Environment template
│   ├── package.json
│   └── server.js            # Entry point
│
├── package.json             # Root package.json
├── .gitignore
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB Atlas Account** (or local MongoDB installation)
- **Git** (optional, for cloning)

## 🚀 Installation

### 1. Clone or Download the Repository

```bash
cd c:\Users\kumar\OneDrive\Desktop\mam
```

### 2. Install Dependencies

#### Install root dependencies:
```bash
npm install
```

#### Install server dependencies:
```bash
cd server
npm install
cd ..
```

#### Install client dependencies:
```bash
cd client
npm install
cd ..
```

Or use the convenience script:
```bash
npm run install-all
```

## 🔐 Environment Variables

### Server Environment Variables

The `.env` file is already configured in `server/.env` with your MongoDB connection string:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://Parteek:67xvvSpbJdK4fOrB@test0.gagdjex.mongodb.net/?retryWrites=true&w=majority&appName=test0

# JWT Secret Key
JWT_SECRET=myscheme_super_secret_jwt_key_2024_change_this_in_production

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

**Note:** For production deployment, create a new `.env` file and change the `JWT_SECRET` to a secure random string.

## 🏃 Running the Application

### Option 1: Run Both Client and Server Concurrently

From the root directory:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend dev server on `http://localhost:5173`

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Building for Production

**Build Frontend:**
```bash
cd client
npm run build
```

The production build will be created in `client/dist/`

## 🌱 Seeding the Database

To populate your database with sample data (categories, schemes, and test users):

```bash
cd server
npm run seed
```

This will create:
- **8 Categories** (Education, Healthcare, Agriculture, etc.)
- **12 Sample Schemes** with complete information
- **2 Test Users** (1 admin, 1 regular user)

### Seed Data Includes:
- PM Jan Dhan Yojana
- Ayushman Bharat
- PM Kisan Samman Nidhi
- National Scholarship Portal
- PM Mudra Yojana
- Beti Bachao Beti Padhao
- PM Awas Yojana
- PM Kaushal Vikas Yojana
- Atal Pension Yojana
- PM Fasal Bima Yojana
- Stand Up India Scheme
- Sukanya Samriddhi Yojana

## 🔑 User Credentials

After seeding the database, use these credentials to login:

### Admin Account
- **Email:** `admin@myscheme.com`
- **Password:** `admin123`
- **Access:** Full admin panel access

### Test User Account
- **Email:** `user@test.com`
- **Password:** `user123`
- **Access:** Regular user features

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |

### Scheme Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/schemes` | Get all schemes (with filters) | No |
| GET | `/api/schemes/:slug` | Get scheme by slug | No |
| GET | `/api/schemes/suggestions` | Get search suggestions | No |
| POST | `/api/schemes` | Create scheme | Admin |
| PUT | `/api/schemes/:id` | Update scheme | Admin |
| DELETE | `/api/schemes/:id` | Delete scheme | Admin |
| GET | `/api/schemes/admin/stats` | Get scheme statistics | Admin |

### Category Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/categories` | Get all categories | No |
| GET | `/api/categories/:slug` | Get category by slug | No |
| POST | `/api/categories` | Create category | Admin |
| PUT | `/api/categories/:id` | Update category | Admin |
| DELETE | `/api/categories/:id` | Delete category | Admin |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/favourites` | Get user favourites | Yes |
| POST | `/api/users/favourites/:schemeId` | Add to favourites | Yes |
| DELETE | `/api/users/favourites/:schemeId` | Remove from favourites | Yes |
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/admin/stats` | Get user statistics | Admin |

### Query Parameters for Schemes

```
GET /api/schemes?search=education&category=<categoryId>&state=Maharashtra&gender=female&minAge=18&maxAge=35&incomeGroup=low-income&page=1&limit=12&sort=-createdAt
```

## 🎯 Features Implementation Details

### 1. Search System
- Full-text search using MongoDB text indexes
- Real-time search suggestions (debounced)
- Multi-criteria filtering (category, state, age, gender, income)
- Pagination support

### 2. Authentication
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes (user and admin)
- Token stored in localStorage
- Auto-redirect on token expiry

### 3. Admin Features
- Dashboard with statistics
- CRUD operations for schemes and categories
- View management
- User analytics

### 4. Database Models

**User Model:**
- Authentication fields
- Profile information (age, gender, state, income group)
- Favourite schemes array
- Role-based access (user/admin)

**Scheme Model:**
- Complete scheme information
- Eligibility criteria (nested object)
- Category reference
- Tags and search optimization
- View and favourite counters

**Category Model:**
- Name and description
- Icon and color customization
- Scheme count tracking
- Slug for URLs

## 🔒 Security Features

- Helmet.js for security headers
- CORS configuration
- JWT token validation
- Password hashing
- Input validation and sanitization
- MongoDB injection prevention
- XSS protection

## 🎨 UI Features

- Responsive design (mobile-first approach)
- Smooth page transitions
- Loading spinners
- Toast notifications
- Modal dialogs
- Search suggestions dropdown
- Color-coded categories
- Interactive cards and buttons

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change PORT in server/.env
PORT=5001
```

### MongoDB Connection Issues
- Verify MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for development)
- Check connection string format
- Ensure network connectivity

### CORS Errors
- Backend must be running on http://localhost:5000
- Frontend must be running on http://localhost:5173
- Check CORS configuration in server.js

## 📦 Deployment

### Frontend (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `client/dist` folder
3. Set environment variable: `VITE_API_URL=<your-backend-url>`

### Backend (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables from `.env`
4. Deploy

### Database
- MongoDB Atlas (recommended)
- Or self-hosted MongoDB instance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as a demonstration project for MERN stack development.

## 🙏 Acknowledgments

- Inspired by [MyScheme.gov.in](https://www.myscheme.gov.in/)
- Built with modern web technologies
- Designed for Indian government scheme discovery

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check MongoDB connection
4. Verify environment variables

---

**Happy Coding! 🚀**
