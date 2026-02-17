# Learning Platform - Complete Project Documentation

## 📋 Table of Contents
1. [File Structure Overview](#file-structure-overview)
2. [Component Documentation](#component-documentation)
3. [Routing Structure](#routing-structure)
4. [Data Flow](#data-flow)
5. [Styling Architecture](#styling-architecture)

## 📁 File Structure Overview

### Purpose of Each Folder

#### `/src/assets/`
**Purpose**: Store static assets
- `images/`: Image files for the application
- `videos/`: Video files for demo purposes

#### `/src/components/common/`
**Purpose**: Reusable components used across the application
- `Navbar.jsx`: Navigation bar component with role-based links
- `Navbar.css`: Navbar styling
- `Button.jsx`: Reusable button component with variants (primary, secondary, danger)
- `Button.css`: Button styling with hover effects

#### `/src/components/auth/`
**Purpose**: Authentication-related components
- `Login.jsx`: Login form with email, password, and role selection
- `Register.jsx`: Registration form for new users
- `Auth.css`: Shared styling for authentication forms

#### `/src/components/teacher/`
**Purpose**: Teacher-specific functionality
- `TeacherDashboard.jsx`: Main dashboard showing courses and stats
- `TeacherDashboard.css`: Dashboard styling
- `AddCourse.jsx`: Form to create new courses with sections
- `AddCourse.css`: Course creation form styling

#### `/src/components/student/`
**Purpose**: Student-specific functionality
- `StudentDashboard.jsx`: Browse courses and view quotes
- `StudentDashboard.css`: Dashboard styling
- `PaymentPage.jsx`: Payment interface (demo)
- `PaymentPage.css`: Payment form styling
- `EnrolledCourses.jsx`: Table view of purchased courses
- `EnrolledCourses.css`: Enrolled courses styling
- `CourseView.jsx`: Course content viewer with video player
- `CourseView.css`: Course view and video player styling

#### `/src/pages/`
**Purpose**: Full page components
- `AuthPage.jsx`: Login/Register page with tab switching
- `AuthPage.css`: Auth page layout and styling

#### `/src/routes/`
**Purpose**: Route protection and navigation logic
- `ProtectedRoute.jsx`: HOC to protect routes based on authentication and role

#### `/src/styles/`
**Purpose**: Global styling
- `global.css`: Global CSS reset and base styles
- `theme.css`: CSS variables for colors, spacing, shadows, etc.

#### Root Files
- `App.jsx`: Main application component with routing
- `main.jsx`: Application entry point
- `index.html`: HTML template
- `vite.config.js`: Vite configuration
- `package.json`: Project dependencies and scripts

## 🧩 Component Documentation

### Common Components

#### Navbar
**Props:**
- `role`: string ('teacher' | 'student')
- `onLogout`: function

**Features:**
- Dynamic navigation based on user role
- Teacher: Home, Add Course, Logout
- Student: Home, Enrolled Courses, Logout

#### Button
**Props:**
- `children`: ReactNode
- `onClick`: function
- `variant`: string ('primary' | 'secondary' | 'danger')
- `type`: string ('button' | 'submit')
- `fullWidth`: boolean

### Authentication Components

#### Login
**Props:**
- `onLogin`: function(userData)
- `onSwitchToRegister`: function

**Features:**
- Email/password validation
- Role selection
- Checks credentials against localStorage
- Auto-redirect based on role

#### Register
**Props:**
- `onRegister`: function(userData)
- `onSwitchToLogin`: function

**Features:**
- User registration with role selection
- Email uniqueness validation
- Stores user in localStorage

### Teacher Components

#### TeacherDashboard
**Props:**
- `user`: object (current user data)
- `onLogout`: function

**Features:**
- Display course statistics
- Add motivational quotes
- View and manage created courses
- Delete courses

#### AddCourse
**Props:**
- `user`: object (current user data)
- `onLogout`: function

**Features:**
- Create course with details (title, educator, category, price, description)
- Add multiple sections with content
- Upload videos/images (stored as base64)
- Section management (add/remove)
- Form validation

### Student Components

#### StudentDashboard
**Props:**
- `user`: object (current user data)
- `onLogout`: function

**Features:**
- Display motivational quotes
- Browse available courses
- Show purchase status
- Navigate to payment or course view

#### PaymentPage
**Props:**
- `user`: object (current user data)
- `onLogout`: function

**Features:**
- Display course details
- Payment form (demo - no real processing)
- Update user's purchased courses
- Redirect after payment

#### EnrolledCourses
**Props:**
- `user`: object (current user data)
- `onLogout`: function

**Features:**
- Display enrolled courses in table format
- Show course ID, name, educator, category
- Navigate to course view

#### CourseView
**Props:**
- `user`: object (current user data)
- `onLogout`: function

**Features:**
- Display course sections
- Video/image player in modal
- Section-by-section content access
- Play/pause controls
- Close player functionality

## 🛣️ Routing Structure

```
/ (AuthPage)
  ├── Login/Register
  │
  ├── /teacher (Protected - Teacher only)
  │   ├── TeacherDashboard
  │   └── /teacher/add-course
  │       └── AddCourse
  │
  └── /student (Protected - Student only)
      ├── StudentDashboard
      ├── /student/payment
      │   └── PaymentPage
      ├── /student/enrolled
      │   └── EnrolledCourses
      └── /student/course-view
          └── CourseView
```

### Route Protection
- All routes except `/` require authentication
- Teacher routes redirect students
- Student routes redirect teachers
- Unauthenticated users redirect to `/`

## 💾 Data Flow

### LocalStorage Structure

```javascript
// users - Array of user objects
{
  id: number,
  name: string,
  email: string,
  password: string,
  role: 'student' | 'teacher',
  purchasedCourses: number[] // Array of course IDs
}

// courses - Array of course objects
{
  id: number,
  title: string,
  educator: string,
  category: string,
  price: number,
  description: string,
  teacherId: number,
  sections: [
    {
      id: number,
      title: string,
      description: string,
      content: string (base64),
      contentType: 'video' | 'image'
    }
  ],
  createdAt: string (ISO date)
}

// quotes - Array of quote objects
{
  id: number,
  text: string,
  teacherId: number,
  teacherName: string
}

// currentUser - Currently logged-in user object
{
  ...user object
}
```

### State Management
- App-level state: `user` (current logged-in user)
- Component-level state: Forms, UI toggles, data lists
- Persistence: LocalStorage for all data

## 🎨 Styling Architecture

### CSS Variables (theme.css)
- **Colors**: Primary, secondary, grays, status colors
- **Shadows**: sm, md, lg, xl
- **Border Radius**: sm, md, lg, xl
- **Spacing**: xs, sm, md, lg, xl

### Design Principles
1. **Consistency**: Using CSS variables throughout
2. **Modularity**: Component-specific CSS files
3. **Responsiveness**: Grid and flexbox layouts
4. **Accessibility**: Focus states, readable fonts
5. **Animations**: Smooth transitions and hover effects

### Color Palette
- Primary: Purple gradient (#667eea to #764ba2)
- Background: Light gray (#f5f7fa)
- Text: Dark gray (#2d3748)
- Success: Green (#10b981)
- Error: Red (#ef4444)

## 🔄 User Flows

### Teacher Flow
1. Register/Login as Teacher
2. View Dashboard (stats + courses)
3. Add Quote (optional)
4. Click "Add Course"
5. Fill course details
6. Add sections with content
7. Submit course
8. Course appears in dashboard and student view

### Student Flow
1. Register/Login as Student
2. View Dashboard (quotes + courses)
3. Browse available courses
4. Click "Enroll Now"
5. Complete payment (demo)
6. Course unlocked
7. View "Enrolled Courses"
8. Click course to view content
9. Access videos/images

## 🚀 Development Notes

### To Add New Features
1. Create component in appropriate folder
2. Add corresponding CSS file
3. Import in App.jsx
4. Add route if needed
5. Update localStorage structure if needed

### Best Practices
- Keep components small and focused
- Use CSS modules or separate CSS files
- Validate user inputs
- Handle edge cases (no data, empty states)
- Provide user feedback (alerts, loading states)

### Future Enhancements
- Backend API integration
- Real authentication system
- Database for data persistence
- Cloud storage for media
- Real payment gateway
- Email notifications
- Course ratings and reviews
- Search and filter functionality
- Progress tracking
- Certificates

---

**This documentation should help you understand and extend the Learning Platform! 🚀**
