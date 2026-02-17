# Learning Platform - MERN Stack Application

A full-stack learning management platform built with MongoDB, Express.js, React, and Node.js (MERN Stack).

## 🎯 Features

### For Teachers

- Create and manage courses with multiple sections
- Add motivational quotes for students
- Upload videos and images for course content
- Set course pricing and descriptions
- Delete courses

### For Students

- Browse available courses
- View motivational quotes from teachers
- Enroll in courses via payment system (demo)
- Access purchased courses
- Watch videos and view course materials
- Track enrolled courses

## 📁 Project Structure

```
learning-platform/
├── src/
│   ├── assets/
│   │   ├── images/        # Image assets
│   │   └── videos/        # Video assets
│   ├── components/
│   │   ├── common/        # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── Button.jsx
│   │   │   └── Button.css
│   │   ├── auth/          # Authentication components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Auth.css
│   │   ├── teacher/       # Teacher-specific components
│   │   │   ├── TeacherDashboard.jsx
│   │   │   ├── TeacherDashboard.css
│   │   │   ├── AddCourse.jsx
│   │   │   └── AddCourse.css
│   │   └── student/       # Student-specific components
│   │       ├── StudentDashboard.jsx
│   │       ├── StudentDashboard.css
│   │       ├── PaymentPage.jsx
│   │       ├── PaymentPage.css
│   │       ├── EnrolledCourses.jsx
│   │       ├── EnrolledCourses.css
│   │       ├── CourseView.jsx
│   │       └── CourseView.css
│   ├── pages/             # Page components
│   │   ├── AuthPage.jsx
│   │   └── AuthPage.css
│   ├── routes/            # Route protection
│   │   └── ProtectedRoute.jsx
│   ├── styles/            # Global styles
│   │   ├── global.css
│   │   └── theme.css
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Quick Start

**📖 For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)**

1. **Extract the project**

   ```bash
   unzip learning-platform.zip
   cd learning-platform
   ```
2. **Setup Backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm run dev
   ```
3. **Setup Frontend** (in a new terminal)

   ```bash
   cd learning-platform
   npm install
   cp .env.example .env
   # Edit .env if needed (default: http://localhost:5000/api)
   npm run dev
   ```
4. **Access the Application**

   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`

### Installation

1. Extract the zip file
2. Navigate to the project directory:

   ```bash
   cd learning-platform
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Start the development server:

   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173`

## 💡 How to Use

### Initial Setup

1. Open the application - you'll see the Login/Register page
2. Register as either a Student or Teacher
3. Login with your credentials

### As a Teacher

1. After login, you'll see your dashboard
2. Click "Add Course" in the navbar to create a new course
3. Fill in course details (title, educator, category, price, description)
4. Add sections with content (videos/images)
5. Submit to create the course
6. Add motivational quotes from your dashboard
7. View and manage all your courses

### As a Student

1. After login, browse available courses
2. View motivational quotes from teachers
3. Click "Enroll Now" on any course
4. Complete the payment (demo - just fill the form)
5. Access your enrolled courses from "Enrolled Courses" in navbar
6. View course content and watch videos

## 🎨 Design Features

- **Clean UI**: Modern, minimalist design with soft colors
- **Responsive**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects and transitions
- **Color Scheme**: Calm purple/blue gradient theme
- **Educational Focus**: Clear hierarchy and easy navigation

## 🔧 Technical Details

### Technologies Used

**Frontend:**

- React 18
- React Router DOM
- Axios
- Vite
- CSS3 with CSS Variables

**Backend:**

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing

### Architecture

**Frontend Structure:**

#### Common Components

- **Navbar**: Role-based navigation bar
- **Button**: Reusable button with variants

#### Authentication

- **Login**: User login with role selection
- **Register**: New user registration

#### Teacher Components

- **TeacherDashboard**: Overview and quote management
- **AddCourse**: Course creation with sections

#### Student Components

- **StudentDashboard**: Browse courses and quotes
- **PaymentPage**: Demo payment interface
- **EnrolledCourses**: Table view of purchased courses
- **CourseView**: Video player and content viewer

**Backend Structure:**

- RESTful API design
- MVC pattern (Models, Controllers, Routes)
- Middleware for authentication and error handling
- MongoDB for data persistence

### API Endpoints

See [backend/README.md](backend/README.md) for complete API documentation.

### Data Storage

- **Database**: MongoDB
- **Collections**: users, courses, quotes
- **Authentication**: JWT tokens stored in localStorage

## 🎯 Features Implemented

✅ JWT-based authentication
✅ MongoDB database integration
✅ RESTful API architecture
✅ Password encryption with bcrypt
✅ Role-based access control
✅ Protected API routes
✅ Teacher course creation with sections
✅ Video and image upload support
✅ Student course enrollment
✅ Payment flow (demo)
✅ Video player with modal
✅ Motivational quotes system
✅ Enrolled courses tracking
✅ Responsive design
✅ Clean, modern UI
✅ LocalStorage persistence

## 📝 Notes

- This is a **full-stack MERN application**
- Backend API with MongoDB database
- Frontend consumes RESTful API
- JWT authentication for secure access
- Videos/images stored as base64 (for demo - use cloud storage in production)
- For production deployment:
  - Use MongoDB Atlas for database
  - Deploy backend to Heroku/Railway/DigitalOcean
  - Deploy frontend to Vercel/Netlify
  - Use AWS S3/Cloudinary for media storage
  - Enable HTTPS
  - Add rate limiting and security headers

## 🛠️ Build for Production

```bash
npm run build
```

This will create a `dist` folder with optimized production files.

## 📄 License

This is a demo educational project.

## 👨‍💻 Support

For any questions or issues, please refer to the code comments or create an issue in the repository.

---

Done By  CHINTHAGINJALA PAVANKALYAN

**Happy Learning! 📚**
