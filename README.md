📚 Learning Platform – MERN Stack

A full-stack Learning Management Platform built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).
This application allows users to register, login, and access courses with secure authentication and backend API integration.

🚀 Features
👨‍🎓 User Features

User Registration & Login

JWT Authentication

Secure Password Hashing (bcrypt)

Browse Available Courses

Enroll in Courses

Responsive UI

🛠️ Admin / Backend Features

RESTful API

Course Management

User Authentication & Authorization

File Upload Support (Multer)

MongoDB Database Integration

Input Validation (Express Validator)

🏗️ Tech Stack
Frontend

React.js

Vite

React Router DOM

Axios

CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT (jsonwebtoken)

bcryptjs

Multer

dotenv

CORS

📁 Project Structure
Mern/
│
├── backend/                 # Backend (Node + Express)
│   ├── src/
│   ├── server.js
│   ├── package.json
│   └── config.env
│
├── src/                     # Frontend Source Code
├── index.html
├── package.json
├── vite.config.js
└── README.md

⚙️ Installation Guide
1️⃣ Clone the Repository
git clone <your-repository-url>
cd Mern

🔹 Backend Setup
cd backend
npm install

Create a .env file inside backend folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start Backend Server
npm run dev


Server runs on:

http://localhost:5000

🔹 Frontend Setup

Go back to root folder:

cd ..
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔐 Environment Variables

Backend .env file requires:

Variable	Description
PORT	Server Port
MONGO_URI	MongoDB Atlas Connection String
JWT_SECRET	Secret key for JWT token
📡 API Endpoints (Sample)
Authentication

POST /api/auth/register

POST /api/auth/login

Courses

GET /api/courses

POST /api/courses

GET /api/courses/:id

🗄️ Database

MongoDB Atlas (Cloud Database)

Mongoose ODM used for schema modeling

🔑 Authentication Flow

User registers

Password hashed using bcrypt

JWT token generated on login

Protected routes verified using middleware

Token stored and sent with requests

📦 Available Scripts
Frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build

Backend
npm run start    # Start server
npm run dev      # Start with nodemon

🎯 Future Improvements

Payment Integration

Admin Dashboard

Course Progress Tracking

Video Streaming

Deployment (Render / Vercel / AWS)

👨‍💻 Author

Pavan Kalyan
BTech CSE Student
Full Stack Developer (MERN)

📜 License

This project is licensed under the ISC License.
