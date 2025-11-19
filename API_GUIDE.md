# 📡 API Testing Guide

## Base URL
```
http://localhost:5000/api
```

## 🔓 Public Endpoints (No Authentication Required)

### 1. Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "MyScheme API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

### 2. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "age": 25,
  "gender": "male",
  "state": "Maharashtra",
  "incomeGroup": "middle-income"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@myscheme.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "...",
      "name": "Admin User",
      "email": "admin@myscheme.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 4. Get All Schemes (with filters)
```http
GET /api/schemes?page=1&limit=12
GET /api/schemes?search=education
GET /api/schemes?category=<categoryId>
GET /api/schemes?state=Maharashtra&gender=female&minAge=18&maxAge=35
```

**Response:**
```json
{
  "success": true,
  "count": 12,
  "total": 12,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "...",
      "name": "Pradhan Mantri Jan Dhan Yojana",
      "slug": "pradhan-mantri-jan-dhan-yojana-1234567890",
      "description": "Financial inclusion program...",
      "benefits": ["Zero balance account", "..."],
      "category": {
        "_id": "...",
        "name": "Social Security",
        "icon": "🛡️",
        "color": "#F59E0B"
      },
      "views": 0,
      "favouriteCount": 0
    }
  ]
}
```

---

### 5. Get Scheme by Slug
```http
GET /api/schemes/pradhan-mantri-jan-dhan-yojana-1234567890
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Pradhan Mantri Jan Dhan Yojana",
    "description": "...",
    "benefits": ["..."],
    "eligibility": {
      "age": { "min": 10, "max": 150 },
      "gender": ["all"],
      "incomeGroup": ["all"],
      "states": ["all"],
      "other": "Indian citizen, No existing bank account"
    },
    "documentsRequired": ["Aadhaar Card", "..."],
    "applicationProcedure": "Visit nearest bank branch...",
    "officialWebsite": "https://pmjdy.gov.in/",
    "category": { "..." },
    "tags": ["banking", "financial-inclusion"],
    "ministry": "Ministry of Finance",
    "views": 1,
    "favouriteCount": 0
  }
}
```

---

### 6. Get Search Suggestions
```http
GET /api/schemes/suggestions?q=jan
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Pradhan Mantri Jan Dhan Yojana",
      "slug": "pradhan-mantri-jan-dhan-yojana-1234567890"
    }
  ]
}
```

---

### 7. Get All Categories
```http
GET /api/categories
```

**Response:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "...",
      "name": "Education",
      "slug": "education",
      "description": "Scholarships and education related schemes",
      "icon": "🎓",
      "color": "#3B82F6",
      "schemeCount": 2
    }
  ]
}
```

---

## 🔐 Protected Endpoints (Authentication Required)

**Add this header to all protected requests:**
```http
Authorization: Bearer <your_jwt_token>
```

### 8. Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Admin User",
    "email": "admin@myscheme.com",
    "role": "admin",
    "favouriteSchemes": []
  }
}
```

---

### 9. Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "age": 30,
  "state": "Delhi"
}
```

---

### 10. Get User Favourites
```http
GET /api/users/favourites
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "name": "Scheme Name",
      "slug": "scheme-slug",
      "category": { "..." }
    }
  ]
}
```

---

### 11. Add to Favourites
```http
POST /api/users/favourites/<schemeId>
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Scheme added to favourites",
  "data": ["schemeId1", "schemeId2"]
}
```

---

### 12. Remove from Favourites
```http
DELETE /api/users/favourites/<schemeId>
Authorization: Bearer <token>
```

---

## 👨‍💼 Admin Only Endpoints

**Requires admin role (role: "admin")**

### 13. Create Scheme
```http
POST /api/schemes
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "New Scheme Name",
  "description": "Detailed description of the scheme",
  "benefits": [
    "Benefit 1",
    "Benefit 2"
  ],
  "eligibility": {
    "age": { "min": 18, "max": 60 },
    "gender": ["all"],
    "incomeGroup": ["low-income", "middle-income"],
    "states": ["all"],
    "other": "Additional eligibility criteria"
  },
  "documentsRequired": [
    "Aadhaar Card",
    "PAN Card"
  ],
  "applicationProcedure": "Step by step application process",
  "officialWebsite": "https://example.gov.in",
  "category": "<categoryId>",
  "tags": ["tag1", "tag2"],
  "ministry": "Ministry Name"
}
```

---

### 14. Update Scheme
```http
PUT /api/schemes/<schemeId>
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Updated Scheme Name",
  "description": "Updated description"
}
```

---

### 15. Delete Scheme
```http
DELETE /api/schemes/<schemeId>
Authorization: Bearer <admin_token>
```

---

### 16. Get Scheme Statistics
```http
GET /api/schemes/admin/stats
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSchemes": 12,
    "totalViews": 150,
    "topSchemes": [
      {
        "_id": "...",
        "name": "Scheme Name",
        "views": 50,
        "slug": "..."
      }
    ],
    "schemesByCategory": [
      {
        "_id": "...",
        "name": "Education",
        "count": 2
      }
    ]
  }
}
```

---

### 17. Create Category
```http
POST /api/categories
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "New Category",
  "description": "Category description",
  "icon": "🎯",
  "color": "#FF5733"
}
```

---

### 18. Update Category
```http
PUT /api/categories/<categoryId>
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Updated Category Name",
  "color": "#00FF00"
}
```

---

### 19. Delete Category
```http
DELETE /api/categories/<categoryId>
Authorization: Bearer <admin_token>
```

**Note:** Cannot delete category with existing schemes.

---

### 20. Get All Users (Admin)
```http
GET /api/users?page=1&limit=20&search=john
Authorization: Bearer <admin_token>
```

---

### 21. Get User Statistics
```http
GET /api/users/admin/stats
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 10,
    "activeUsers": 8,
    "adminUsers": 1,
    "usersByRole": [
      { "_id": "user", "count": 9 },
      { "_id": "admin", "count": 1 }
    ],
    "recentUsers": [...]
  }
}
```

---

## 🧪 Testing with cURL

### Example: Login and Get User Data
```bash
# 1. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@myscheme.com","password":"admin123"}'

# 2. Copy the token from response

# 3. Get user data
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🔍 Testing with Postman

### Setup:
1. Create a new collection "MyScheme API"
2. Add environment variables:
   - `baseUrl`: `http://localhost:5000/api`
   - `token`: (will be set after login)

### After Login:
1. Copy token from login response
2. Set as environment variable or use in Authorization tab
3. Type: Bearer Token
4. Token: `<paste token>`

---

## ⚠️ Common Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized, no token provided"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Scheme not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## 📝 Notes

- All dates are in ISO 8601 format
- Pagination starts at page 1
- Default limit is 12 items per page
- Tokens expire after 30 days
- MongoDB ObjectIds are 24-character hex strings

---

**Happy Testing! 🚀**
