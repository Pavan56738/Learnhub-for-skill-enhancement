# Learning Platform Backend API

A robust RESTful API built with Node.js, Express, and MongoDB for the Learning Platform application.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Teacher/Student)
  - Secure password hashing with bcrypt
  
- **Course Management**
  - Create, read, update, delete courses
  - Course sections with video/image content
  - Course enrollment system
  
- **Quote System**
  - Teachers can create motivational quotes
  - Public access to all quotes
  
- **User Management**
  - User registration and login
  - Profile management
  - Purchase history tracking

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── courseController.js # Course management
│   │   └── quoteController.js  # Quote management
│   ├── middleware/
│   │   ├── auth.js             # Auth middleware
│   │   └── errorHandler.js     # Error handling
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── Course.js           # Course schema
│   │   └── Quote.js            # Quote schema
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   ├── courseRoutes.js     # Course endpoints
│   │   └── quoteRoutes.js      # Quote endpoints
│   └── utils/
│       └── jwt.js              # JWT utilities
├── .env.example                # Environment variables template
├── .gitignore
├── package.json
├── server.js                   # Entry point
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Steps

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables in `.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/learning-platform
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:5173
   ```

5. Start MongoDB (if running locally):
   ```bash
   mongod
   ```

6. Start the server:
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Public | Register new user |
| POST | `/login` | Public | Login user |
| GET | `/me` | Private | Get current user |
| PUT | `/updatedetails` | Private | Update user details |

### Course Routes (`/api/courses`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | Get all courses |
| GET | `/:id` | Public | Get single course |
| POST | `/` | Teacher | Create new course |
| PUT | `/:id` | Teacher | Update course |
| DELETE | `/:id` | Teacher | Delete course |
| GET | `/teacher/mycourses` | Teacher | Get teacher's courses |
| POST | `/:id/enroll` | Student | Enroll in course |
| GET | `/student/enrolled` | Student | Get enrolled courses |

### Quote Routes (`/api/quotes`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | Get all quotes |
| GET | `/:id` | Public | Get single quote |
| POST | `/` | Teacher | Create new quote |
| PUT | `/:id` | Teacher | Update quote |
| DELETE | `/:id` | Teacher | Delete quote |
| GET | `/teacher/myquotes` | Teacher | Get teacher's quotes |

### Health Check (`/api/health`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/health` | Public | Check server status |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

### Example: Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

### Example: Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "purchasedCourses": []
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 📝 Data Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['student', 'teacher']),
  purchasedCourses: [ObjectId] (ref: Course),
  createdAt: Date,
  updatedAt: Date
}
```

### Course Schema
```javascript
{
  title: String (required),
  educator: String (required),
  category: String (required),
  price: Number (required),
  description: String (required),
  sections: [{
    title: String,
    description: String,
    content: String (base64 or URL),
    contentType: String (enum: ['video', 'image', 'none']),
    order: Number
  }],
  teacher: ObjectId (ref: User),
  enrolledStudents: [ObjectId] (ref: User),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Quote Schema
```javascript
{
  text: String (required),
  teacher: ObjectId (ref: User),
  teacherName: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization
- Input validation
- CORS configuration
- Environment variable protection
- MongoDB injection prevention

## 🧪 Testing the API

You can test the API using:

1. **Postman** - Import the collection and test endpoints
2. **cURL** - Command line testing
3. **Thunder Client** (VS Code extension)
4. **Frontend Application** - Connected React app

### Example cURL Request:
```bash
# Get all courses
curl http://localhost:5000/api/courses

# Create course (requires auth)
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Complete Web Development",
    "educator": "John Doe",
    "category": "Programming",
    "price": 999,
    "description": "Learn full stack web development",
    "sections": []
  }'
```

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "stack": "Stack trace (development only)"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## 🔄 Database Connection

### Local MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/learning-platform
```

### MongoDB Atlas
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learning-platform?retryWrites=true&w=majority
```

## 📊 Performance Considerations

- Database indexing on frequently queried fields
- Request payload size limit (50MB for file uploads)
- Connection pooling with Mongoose
- Efficient query population
- Proper error handling

## 🐛 Debugging

Enable detailed logs:
```env
NODE_ENV=development
```

View MongoDB queries:
```javascript
mongoose.set('debug', true);
```

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Configure MongoDB Atlas
4. Set proper CORS origins
5. Enable HTTPS

### Recommended Platforms
- **Heroku** - Easy deployment
- **Railway** - Modern platform
- **DigitalOcean** - Full control
- **AWS EC2** - Enterprise solution
- **Render** - Free tier available

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)

## 🤝 Support

For issues or questions:
1. Check the documentation
2. Review error messages
3. Check MongoDB connection
4. Verify environment variables
5. Test with Postman

---

**Happy Coding! 🎉**
