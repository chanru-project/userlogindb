<<<<<<< HEAD
📘 FutureEducation

FutureEducation is a free online learning platform designed to help affordable and underprivileged people learn technology and AI-related courses at zero cost.
Students can study courses, log in securely, and receive certifications, with all data stored safely in MongoDB.

🌍 Project Purpose

Many people cannot afford paid platforms to learn technology and AI.
FutureEducation solves this by providing:

Free access to tech & AI courses

Student login system

Certification after course completion

Secure data storage

🚀 Tech Stack
Frontend

HTML

CSS

JavaScript

React.js

Vite

Frontend runs on:

http://localhost:5173

Backend

Node.js

Express.js

Backend runs on:

http://localhost:5000

Database

MongoDB

Stores:

Student login details

Course progress

Certification records

📁 Project Structure
futureeducation/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js


├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── server.js
│   ├── package.json
│-------README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/chanru-project/userlogindb.git
cd futureeducation

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend will start at:

http://localhost:5173

3️⃣ Backend Setup
=======
# 🎓 EduFuture - Student Course Enrollment System

A modern, full-stack web application for managing student enrollments, course information, and certificate generation. Built with React, Node.js, Express, and MongoDB.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Target Users](#target-users)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Design](#database-design)
- [Data Flow](#data-flow)
- [Authentication Flow](#authentication-flow)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

**EduFuture** is a comprehensive student course enrollment and management system that enables educational institutions to:
- Manage user authentication and authorization
- Track student enrollments and records
- Provide course information with interactive video content
- Generate and download course completion certificates
- Monitor system statistics (signups, logins, student counts)

The platform features a modern, responsive UI with protected routes, real-time form validation, and seamless integration between frontend and backend services.

---

## 🔍 Problem Statement

Educational institutions need an efficient, centralized platform to:
1. **Manage Student Records**: Keep track of enrolled students with their course details
2. **Authenticate Users**: Secure login/signup system for authorized access
3. **Course Management**: Display available courses with detailed information and video content
4. **Certificate Generation**: Automatically generate downloadable certificates upon course completion
5. **Analytics**: Track user engagement metrics (signups, logins, downloads)
6. **User Experience**: Provide a modern, intuitive interface accessible from any device

---

## 👥 Target Users

1. **Educational Administrators**: Manage student records, view enrollment statistics
2. **Students**: Browse courses, watch educational videos, download certificates
3. **Instructors**: Add and track student enrollments
4. **System Managers**: Monitor overall system usage and analytics

---

## ✨ Key Features

### Authentication & Authorization
- ✅ Secure user signup and login
- ✅ Protected routes requiring authentication
- ✅ Session management using localStorage
- ✅ Login/signup statistics tracking

### Student Management
- ✅ Add new students with detailed information (name, roll number, course, email)
- ✅ View all enrolled students in an organized grid
- ✅ Search/filter students by name, roll number, or course
- ✅ Soft delete functionality (isDeleted flag)
- ✅ Track who added each student

### Course System
- ✅ Display multiple courses with details (duration, level, topics, outcomes)
- ✅ Embedded YouTube video integration with progress tracking
- ✅ Expandable course cards showing detailed information
- ✅ Video completion detection (95% watch threshold)
- ✅ Prerequisites and learning outcome listings

### Certificate Generation
- ✅ Dynamic certificate creation with user name
- ✅ Automatic signature generation from name
- ✅ Download certificates as PNG images using html2canvas
- ✅ Track certificate downloads in database
- ✅ Video completion verification before certificate access

### Additional Features
- ✅ Responsive navigation bar with active route highlighting
- ✅ Modern, animated UI components
- ✅ About page with platform highlights
- ✅ Contact page with form submission
- ✅ Free consultation booking page
- ✅ Dashboard with statistics and quick links
- ✅ Footer with social links
- ✅ Scroll-to-top on route changes

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18.2.0** | UI library for building component-based interfaces |
| **React Router DOM 6.20.0** | Client-side routing and navigation |
| **Vite 4.5.0** | Fast build tool and dev server |
| **Axios 1.6.2** | HTTP client for API requests |
| **html2canvas 1.4.1** | Convert HTML elements to canvas/images for certificates |
| **CSS3** | Custom styling with modern animations |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express 4.18.2** | Web application framework |
| **MongoDB** | NoSQL database for data persistence |
| **Mongoose 7.6.3** | MongoDB object modeling |
| **CORS 2.8.5** | Cross-Origin Resource Sharing middleware |

### Additional Tools
| Tool | Purpose |
|------|---------|
| **ES6 Modules** | Modern JavaScript module system |
| **YouTube IFrame API** | Embedded video player with tracking |
| **LocalStorage** | Client-side session management |

---

## 🏗 Project Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                          │
├─────────────────────────────────────────────────────────────────┤
│  React App (Port 3000 in dev, served from backend in prod)     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Pages: Home, About, Courses, Students, Certificate      │   │
│  │ Components: Navbar, Footer                              │   │
│  │ Services: api.js, studentApi.js                         │   │
│  │ Routing: React Router with Protected Routes            │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP/REST API
┌─────────────────────────────────────────────────────────────────┐
│                      EXPRESS SERVER (Port 5000)                 │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  Auth Routes   │  │ Student Routes  │  │ Certificate Rts │  │
│  │  /api/login    │  │ /api/students   │  │ /api/certs/dl   │  │
│  │  /api/signup   │  │ CRUD Operations │  │ Track downloads │  │
│  │  /api/stats    │  └─────────────────┘  └─────────────────┘  │
│  └────────────────┘                                             │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Controllers & Business Logic                  │ │
│  │  authController | studentController | certificateController│ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↕ Mongoose ODM
┌─────────────────────────────────────────────────────────────────┐
│               MONGODB DATABASE (userlogindb)                    │
├─────────────────────────────────────────────────────────────────┤
│  Collections:                                                   │
│  ┌──────────────┐ ┌──────────────┐ ┌───────────────────────┐  │
│  │    users     │ │   students   │ │ certificatedownloads  │  │
│  │ - name       │ │ - name       │ │ - name                │  │
│  │ - email      │ │ - rollNumber │ │ - courseTitle         │  │
│  │ - password   │ │ - course     │ │ - signature           │  │
│  │ - loginCount │ │ - email      │ │ - downloadedAt        │  │
│  └──────────────┘ │ - addedBy    │ └───────────────────────┘  │
│                   │ - isDeleted  │                             │
│  ┌──────────────┐ └──────────────┘                             │
│  │    stats     │                                               │
│  │ - signups    │                                               │
│  │ - logins     │                                               │
│  └──────────────┘                                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
userlogindb/
│
├── backend/                      # Backend server code
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic (login, signup, stats)
│   │   ├── studentController.js  # Student CRUD operations
│   │   └── certificateController.js # Certificate download tracking
│   ├── models/
│   │   ├── User.js               # User schema (name, email, password, loginCount)
│   │   ├── Student.js            # Student schema (name, rollNumber, course, email)
│   │   ├── CertificateDownload.js # Certificate download records
│   │   └── Stats.js              # Global statistics (signups, logins)
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints routing
│   │   ├── studentRoutes.js      # Student endpoints routing
│   │   └── certificateRoutes.js  # Certificate endpoints routing
│   ├── server.js                 # Main Express server entry point
│   └── package.json              # Backend dependencies
│
├── frontend/                     # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar with logout
│   │   │   └── Footer.jsx        # Footer with links
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login/Signup page
│   │   │   ├── Home.jsx          # Dashboard home page
│   │   │   ├── About.jsx         # About page
│   │   │   ├── Courses.jsx       # Course listing with videos
│   │   │   ├── Certificate.jsx   # Certificate generator
│   │   │   ├── Contact.jsx       # Contact form
│   │   │   ├── Consultation.jsx  # Consultation booking
│   │   │   └── Students.jsx      # Student management
│   │   ├── services/
│   │   │   ├── api.js            # Auth API calls (login, signup)
│   │   │   └── studentApi.js     # Student API calls (CRUD)
│   │   ├── styles/
│   │   │   ├── login.css         # Login page styles
│   │   │   ├── main.css          # Global styles
│   │   │   └── dashboard.css     # Dashboard-specific styles
│   │   ├── App.jsx               # Main app component with routing
│   │   └── main.jsx              # React entry point
│   ├── index.html                # HTML template
│   ├── vite.config.js            # Vite configuration with proxy
│   └── package.json              # Frontend dependencies
│
└── README.md                     # This file
```

---

## 🚀 Installation & Setup

### Prerequisites

Before starting, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **npm** or **yarn** package manager

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd userlogindb
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- express
- mongoose
- cors

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

This installs:
- react
- react-dom
- react-router-dom
- axios
- html2canvas
- vite

---

## ⚙️ Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory (optional):

```env
# MongoDB Connection
MONGO_URI=mongodb://127.0.0.1:27017/userlogindb

# Server Port
PORT=5000
```

**Note:** If `.env` is not created, the application uses default values:
- MongoDB: `mongodb://127.0.0.1:27017/userlogindb`
- Port: `5000`

### Frontend Configuration

The frontend is configured in [vite.config.js](frontend/vite.config.js):

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
```

API URL in [api.js](frontend/src/services/api.js) and [studentApi.js](frontend/src/services/studentApi.js):
```javascript
const API_URL = 'http://localhost:5000/api';
```

---

## ▶️ Running the Application

### Option 1: Development Mode (Recommended)

Run backend and frontend separately for development:

#### Terminal 1 - Start MongoDB

```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
# or
sudo service mongod start
```

#### Terminal 2 - Start Backend Server

```bash
cd backend
npm start
```

Backend runs on: **http://localhost:5000**

#### Terminal 3 - Start Frontend Dev Server

```bash
cd frontend
npm run dev
```

Frontend runs on: **http://localhost:3000** (or the port shown in terminal)

### Option 2: Production Build

Build frontend and serve from backend:

```bash
# Build frontend
cd frontend
npm run build

# Start backend (serves built frontend)
cd ../backend
npm start
```

Access the application at: **http://localhost:5000**

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. User Login
```http
POST /api/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "name": "John Doe",
  "email": "user@example.com",
  "loginCount": 5
}
```

**Error Responses:**
- `400`: Missing email or password
- `404`: User not found
- `401`: Invalid password
- `500`: Server error

**Side Effects:**
- Increments user's `loginCount`
- Increments global `stats.logins` counter

---

#### 2. User Signup
```http
POST /api/signup
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "Account created successfully",
  "name": "John Doe",
  "email": "user@example.com"
}
```

**Error Responses:**
- `400`: Missing required fields
- `409`: User already exists
- `500`: Server error

**Side Effects:**
- Creates new user in database
- Increments global `stats.signups` counter

---

#### 3. Get Statistics
```http
GET /api/stats
```

**Success Response (200):**
```json
{
  "signups": 150,
  "logins": 3420
}
```

**Error Responses:**
- `500`: Server error

---

### Student Management Endpoints

#### 4. Get All Students
```http
GET /api/students
```

**Success Response (200):**
```json
[
  {
    "_id": "65abc123...",
    "name": "Jane Smith",
    "rollNumber": "23A041",
    "course": "Computer Science",
    "email": "jane@example.com",
    "addedBy": "John Doe",
    "isDeleted": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

**Notes:**
- Returns only students where `isDeleted !== true`
- Sorted by `createdAt` in descending order (newest first)

---

#### 5. Create Student
```http
POST /api/students
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "rollNumber": "23A041",
  "course": "Computer Science",
  "email": "jane@example.com",
  "addedBy": "John Doe"
}
```

**Success Response (201):**
```json
{
  "message": "Student added successfully",
  "student": {
    "_id": "65abc123...",
    "name": "Jane Smith",
    "rollNumber": "23A041",
    "course": "Computer Science",
    "email": "jane@example.com",
    "addedBy": "John Doe",
    "isDeleted": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Missing required fields
- `409`: Student with roll number already exists
- `500`: Server error

---

#### 6. Update Student
```http
PUT /api/students/:id
```

**URL Parameters:**
- `id` (string, required): Student MongoDB ObjectId

**Request Body:**
```json
{
  "name": "Jane Smith Updated",
  "rollNumber": "23A042",
  "course": "Data Science",
  "email": "jane.new@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Student updated successfully",
  "student": {
    "_id": "65abc123...",
    "name": "Jane Smith Updated",
    "rollNumber": "23A042",
    "course": "Data Science",
    "email": "jane.new@example.com",
    "addedBy": "John Doe",
    "isDeleted": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `404`: Student not found or already deleted
- `409`: New roll number already in use
- `500`: Server error

---

#### 7. Delete Student (Soft Delete)
```http
DELETE /api/students/:id
```

**URL Parameters:**
- `id` (string, required): Student MongoDB ObjectId

**Success Response (200):**
```json
{
  "message": "Student deleted successfully"
}
```

**Error Responses:**
- `404`: Student not found
- `500`: Server error

**Notes:**
- This is a soft delete (sets `isDeleted: true`)
- Student record remains in database but won't appear in GET requests

---

### Certificate Management Endpoints

#### 8. Record Certificate Download
```http
POST /api/certificates/download
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "courseTitle": "Computer Science Fundamentals",
  "signature": "j.smith"
}
```

**Success Response (201):**
```json
{
  "message": "Recorded",
  "id": "65abc456..."
}
```

**Error Responses:**
- `400`: Missing name or courseTitle
- `500`: Server error

**Notes:**
- Tracks who downloaded certificates and when
- Signature field is optional

---

## 🗄 Database Design

### MongoDB Database: `userlogindb`

#### Collection: `users`

Stores registered user accounts.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | String | Yes | - | User's full name |
| `email` | String | Yes | - | Unique email address |
| `password` | String | Yes | - | Plain text password (⚠️ should be hashed in production) |
| `loginCount` | Number | No | 0 | Number of times user logged in |
| `createdAt` | Date | Auto | now | Account creation timestamp |
| `updatedAt` | Date | Auto | now | Last update timestamp |

**Indexes:**
- `email` (unique)

**Example Document:**
```json
{
  "_id": ObjectId("65abc123..."),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "loginCount": 5,
  "createdAt": ISODate("2024-01-10T08:00:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z")
}
```

---

#### Collection: `students`

Stores student enrollment records.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | String | Yes | - | Student's full name |
| `rollNumber` | String | Yes | - | Unique student identifier |
| `course` | String | Yes | - | Enrolled course name |
| `email` | String | Yes | - | Student email |
| `addedBy` | String | Yes | - | Name of user who added student |
| `isDeleted` | Boolean | No | false | Soft delete flag |
| `createdAt` | Date | Auto | now | Record creation timestamp |
| `updatedAt` | Date | Auto | now | Last update timestamp |

**Indexes:**
- `rollNumber` (unique)

**Example Document:**
```json
{
  "_id": ObjectId("65abc456..."),
  "name": "Jane Smith",
  "rollNumber": "23A041",
  "course": "Computer Science",
  "email": "jane@example.com",
  "addedBy": "John Doe",
  "isDeleted": false,
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z")
}
```

---

#### Collection: `certificatedownloads`

Tracks certificate download events.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | String | Yes | - | Certificate recipient name |
| `courseTitle` | String | Yes | - | Course name on certificate |
| `signature` | String | No | - | Generated signature |
| `downloadedAt` | Date | No | now | Download timestamp |
| `createdAt` | Date | Auto | now | Record creation timestamp |
| `updatedAt` | Date | Auto | now | Last update timestamp |

**Example Document:**
```json
{
  "_id": ObjectId("65abc789..."),
  "name": "Jane Smith",
  "courseTitle": "Computer Science Fundamentals",
  "signature": "j.smith",
  "downloadedAt": ISODate("2024-01-20T14:45:00Z"),
  "createdAt": ISODate("2024-01-20T14:45:00Z"),
  "updatedAt": ISODate("2024-01-20T14:45:00Z")
}
```

---

#### Collection: `stats`

Stores global application statistics.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `key` | String | No | 'global' | Identifier (always 'global') |
| `signups` | Number | No | 0 | Total number of signups |
| `logins` | Number | No | 0 | Total number of logins |
| `createdAt` | Date | Auto | now | Record creation timestamp |
| `updatedAt` | Date | Auto | now | Last update timestamp |

**Indexes:**
- `key` (unique)

**Example Document:**
```json
{
  "_id": ObjectId("65abcabc..."),
  "key": "global",
  "signups": 150,
  "logins": 3420,
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-20T15:00:00Z")
}
```

---

### Database Relationships

```
users (1) ──> (n) certificatedownloads
  │
  └─> (indirectly tracks via localStorage) ──> (n) students
      (students.addedBy matches user.name)

stats (1 document, global counters)
  ├─> tracks total signups from users collection
  └─> tracks total login events
```

---

## 🔄 Data Flow

### User Authentication Flow

```
┌─────────────┐         ┌──────────────┐         ┌──────────────┐
│   Browser   │         │   Frontend   │         │   Backend    │
│  (Login UI) │         │   (api.js)   │         │(authController│
└──────┬──────┘         └───────┬──────┘         └──────┬───────┘
       │                        │                        │
       │ 1. Enter email/pass    │                        │
       │───────────────────────>│                        │
       │                        │ 2. POST /api/login     │
       │                        │───────────────────────>│
       │                        │   {email, password}    │
       │                        │                        │
       │                        │                 3. Query users
       │                        │                 collection
       │                        │                        │
       │                        │                 4. Verify password
       │                        │                        │
       │                        │                 5. Increment
       │                        │                 loginCount
       │                        │                        │
       │                        │                 6. Update stats
       │                        │                        │
       │                        │  7. Response           │
       │                        │<───────────────────────│
       │                        │  {name, email,         │
       │                        │   loginCount}          │
       │ 8. Store userName      │                        │
       │    in localStorage     │                        │
       │<───────────────────────│                        │
       │                        │                        │
       │ 9. Redirect to /home   │                        │
       │                        │                        │
```

---

### Student Management Flow

```
┌──────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   Browser    │       │    Frontend     │       │     Backend     │
│(Students.jsx)│       │ (studentApi.js) │       │(studentController│
└──────┬───────┘       └────────┬────────┘       └────────┬────────┘
       │                        │                          │
       │ 1. Load page           │                          │
       │───────────────────────>│                          │
       │                        │ 2. GET /api/students     │
       │                        │─────────────────────────>│
       │                        │                   3. Find all
       │                        │                   where isDeleted
       │                        │                   !== true
       │                        │                          │
       │                        │  4. Return array         │
       │                        │<─────────────────────────│
       │ 5. Display students    │                          │
       │<───────────────────────│                          │
       │                        │                          │
       │ 6. Fill form & submit  │                          │
       │───────────────────────>│                          │
       │                        │ 7. POST /api/students    │
       │                        │─────────────────────────>│
       │                        │  {name, rollNumber,      │
       │                        │   course, email, addedBy}│
       │                        │                          │
       │                        │                   8. Validate
       │                        │                   unique rollNumber
       │                        │                          │
       │                        │                   9. Create document
       │                        │                          │
       │                        │  10. Success response    │
       │                        │<─────────────────────────│
       │                        │  {message, student}      │
       │                        │                          │
       │ 11. Refresh list       │ 12. GET /api/students    │
       │                        │─────────────────────────>│
       │                        │                          │
```

---

### Certificate Generation Flow

```
┌──────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   Browser    │       │    Frontend     │       │     Backend     │
│(Certificate) │       │ (axios direct)  │       │(certificateCtrl)│
└──────┬───────┘       └────────┬────────┘       └────────┬────────┘
       │                        │                          │
       │ 1. Watch course video  │                          │
       │    (YouTube API)       │                          │
       │                        │                          │
       │ 2. Video 95% complete  │                          │
       │    → mark as completed │                          │
       │                        │                          │
       │ 3. Navigate to         │                          │
       │    /certificate with   │                          │
       │    course data         │                          │
       │                        │                          │
       │ 4. Enter name          │                          │
       │───────────────────────>│                          │
       │                        │                          │
       │ 5. Click "Download"    │                          │
       │───────────────────────>│                          │
       │                        │                          │
       │                 6. html2canvas                    │
       │                    captures certificate            │
       │                    DOM element                     │
       │                        │                          │
       │                        │ 7. POST /api/certificates/
       │                        │    download              │
       │                        │─────────────────────────>│
       │                        │  {name, courseTitle,     │
       │                        │   signature}             │
       │                        │                          │
       │                        │              8. Create record
       │                        │                          │
       │                        │  9. Response             │
       │                        │<─────────────────────────│
       │                        │  {message, id}           │
       │                        │                          │
       │                 10. Download PNG                  │
       │                     to user's device              │
       │<───────────────────────│                          │
       │                        │                          │
```

---

## 🔐 Authentication Flow

### Login Process

1. **User Input**: User enters email and password on [Login.jsx](frontend/src/pages/Login.jsx)
2. **API Call**: `loginUser()` from [api.js](frontend/src/services/api.js) sends POST to `/api/login`
3. **Backend Validation**: [authController.js](backend/controllers/authController.js) checks:
   - Email exists in database
   - Password matches (⚠️ plain text comparison, should use bcrypt in production)
4. **Stats Update**: Increments `user.loginCount` and `stats.logins`
5. **Response**: Returns user data (name, email, loginCount)
6. **Storage**: Frontend stores `userName` in `localStorage`
7. **Redirect**: User redirected to `/home`

### Protected Routes

Protected routes check for `userName` in `localStorage`:

```jsx
const ProtectedRoute = ({ children }) => {
  const userName = localStorage.getItem('userName');
  
  if (!userName) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};
```

**Protected Pages:**
- `/home`
- `/about`
- `/courses`
- `/certificate`
- `/contact`
- `/consultation`
- `/students`

### Logout Process

1. User clicks "Logout" button in [Navbar.jsx](frontend/src/components/Navbar.jsx)
2. `localStorage.removeItem('userName')` clears session
3. User redirected to `/` (login page)

---

## 🎨 Frontend Architecture

### Component Hierarchy

```
App.jsx (Root)
├── Router
│   ├── ScrollToTop (auto-scroll on route change)
│   └── Routes
│       ├── / → Login.jsx (public)
│       └── ProtectedRoute wrapper
│           ├── /home → Home.jsx
│           │   ├── Navbar.jsx
│           │   └── Footer.jsx
│           ├── /about → About.jsx
│           │   ├── Navbar.jsx
│           │   └── Footer.jsx
│           ├── /courses → Courses.jsx
│           │   ├── Navbar.jsx
│           │   ├── YouTube embedded players
│           │   └── Footer.jsx
│           ├── /certificate → Certificate.jsx
│           │   ├── Navbar.jsx
│           │   └── html2canvas integration
│           ├── /contact → Contact.jsx
│           │   ├── Navbar.jsx
│           │   └── Footer.jsx
│           ├── /consultation → Consultation.jsx
│           │   ├── Navbar.jsx
│           │   └── Footer.jsx
│           └── /students → Students.jsx
│               ├── Navbar.jsx
│               └── Footer.jsx
```

### State Management

**Local State (useState):**
- Form inputs (login, signup, student management)
- UI states (loading, error messages, success messages)
- Modal/expansion states (course cards)
- Video completion tracking

**Browser Storage (localStorage):**
- `userName`: Stores logged-in user's name for session management

**Props & Context:**
- Props passed via React Router's `useLocation().state` (e.g., course data to certificate page)

### Routing Strategy

Uses **React Router DOM v6** with:
- `BrowserRouter` for client-side routing
- `Routes` and `Route` components
- `Navigate` for redirects
- `useNavigate` hook for programmatic navigation
- `useLocation` hook for accessing route state

### API Service Layer

Centralized API calls in:
- [api.js](frontend/src/services/api.js): Authentication endpoints
- [studentApi.js](frontend/src/services/studentApi.js): Student CRUD operations

Benefits:
- Reusable functions
- Centralized error handling
- Easy to mock for testing
- Clear separation of concerns

---

## 🔧 Backend Architecture

### MVC Pattern Implementation

```
Request → Routes → Controllers → Models → Database
                     ↓
                  Response
```

#### Models (`models/`)
Mongoose schemas defining data structure:
- [User.js](backend/models/User.js): User authentication data
- [Student.js](backend/models/Student.js): Student records
- [CertificateDownload.js](backend/models/CertificateDownload.js): Download tracking
- [Stats.js](backend/models/Stats.js): Application statistics

#### Controllers (`controllers/`)
Business logic for handling requests:
- [authController.js](backend/controllers/authController.js): Login, signup, stats retrieval
- [studentController.js](backend/controllers/studentController.js): Student CRUD operations
- [certificateController.js](backend/controllers/certificateController.js): Certificate tracking

#### Routes (`routes/`)
API endpoint definitions:
- [authRoutes.js](backend/routes/authRoutes.js): `/api/login`, `/api/signup`, `/api/stats`
- [studentRoutes.js](backend/routes/studentRoutes.js): `/api/students` (GET, POST, PUT, DELETE)
- [certificateRoutes.js](backend/routes/certificateRoutes.js): `/api/certificates/download`

### Middleware Stack

1. **CORS**: Enables cross-origin requests from frontend
2. **express.json()**: Parses JSON request bodies
3. **express.static()**: Serves built frontend in production
4. **Catch-all route**: Serves `index.html` for SPA routing

### Error Handling

Controllers use try-catch blocks and return appropriate HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad request (missing fields)
- `401`: Unauthorized (wrong password)
- `404`: Not found
- `409`: Conflict (duplicate data)
- `500`: Server error

---

## 🚀 Future Improvements

### Security Enhancements
- [ ] **Password Hashing**: Implement bcrypt for secure password storage
- [ ] **JWT Authentication**: Replace localStorage with HTTP-only cookies and JWT tokens
- [ ] **Rate Limiting**: Prevent brute force attacks on login endpoint
- [ ] **Input Validation**: Use libraries like Joi or express-validator
- [ ] **CSRF Protection**: Implement CSRF tokens for form submissions
- [ ] **Environment Variables**: Move all sensitive data to `.env` files
- [ ] **HTTPS**: Enforce secure connections in production

### Feature Additions
- [ ] **Email Verification**: Send verification emails on signup
- [ ] **Password Reset**: Forgot password functionality
- [ ] **Role-Based Access Control (RBAC)**: Admin, instructor, student roles
- [ ] **Real-time Notifications**: WebSocket integration for instant updates
- [ ] **File Upload**: Allow profile pictures and document uploads
- [ ] **Advanced Search**: Full-text search with filters and sorting
- [ ] **Pagination**: Implement pagination for large student lists
- [ ] **Dashboard Analytics**: Charts and graphs for statistics
- [ ] **Course Progress Tracking**: Detailed progress for each course
- [ ] **Discussion Forum**: Community features for students
- [ ] **Mobile App**: React Native version

### Code Quality
- [ ] **Unit Tests**: Jest/Vitest for frontend and backend
- [ ] **Integration Tests**: API endpoint testing
- [ ] **E2E Tests**: Cypress or Playwright
- [ ] **Code Linting**: ESLint and Prettier configuration
- [ ] **TypeScript**: Migrate to TypeScript for type safety
- [ ] **API Documentation**: Swagger/OpenAPI documentation
- [ ] **CI/CD Pipeline**: GitHub Actions for automated testing and deployment

### Performance Optimization
- [ ] **Database Indexing**: Optimize MongoDB queries
- [ ] **Caching**: Redis for frequently accessed data
- [ ] **Lazy Loading**: Code splitting for faster initial load
- [ ] **Image Optimization**: Compress and lazy-load images
- [ ] **CDN**: Use CDN for static assets
- [ ] **Database Connection Pooling**: Optimize MongoDB connections

### UI/UX Improvements
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- [ ] **Internationalization (i18n)**: Multi-language support
- [ ] **Responsive Design**: Better mobile experience
- [ ] **Loading Skeletons**: Improve perceived performance
- [ ] **Form Validation**: Real-time validation with helpful error messages
- [ ] **Confirmation Modals**: Better user feedback for actions

### DevOps
- [ ] **Docker**: Containerize application
- [ ] **Kubernetes**: Orchestration for scaling
- [ ] **Monitoring**: Implement logging and monitoring (e.g., Winston, Morgan)
- [ ] **Error Tracking**: Sentry or similar service
- [ ] **Database Backups**: Automated MongoDB backups
- [ ] **Load Balancing**: Handle high traffic

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style Guidelines
- Use ES6+ JavaScript features
- Follow Airbnb JavaScript style guide
- Write meaningful commit messages
- Comment complex logic
- Update documentation for API changes

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Contact & Support

- **Email**: support@edufuture.com
- **Phone**: 9965719690
- **Address**: 123 South Street, Tamil Nadu, India 600001

---

## 🎯 Quick Start Summary

```bash
# 1. Start MongoDB
mongod

# 2. Backend (Terminal 1)
>>>>>>> 021679e (Documentation changes)
cd backend
npm install
npm start

<<<<<<< HEAD

Backend will start at:

http://localhost:5000

4️⃣ MongoDB Setup

Install MongoDB (local or cloud – MongoDB Atlas)

Add MongoDB connection string in .env

Example .env:

MONGO_URI=mongodb://localhost:27017/futureeducation
PORT=5000

🔐 Features
👩‍🎓 Student Features

Student registration & login

Access free courses

Track learning progress

Get course completion certificate

🛠️ Backend Features

REST APIs for students & courses

Secure authentication

MongoDB data storage

Certification data management

🔁 Application Flow
User (Browser)
   ↓
Frontend (React – Port 5173)
   ↓
Backend API (Node.js – Port 5000)
   ↓
MongoDB Database

📜 Certification System

Certificate generated after course completion

Stored in MongoDB

Linked to student account

Can be downloaded or verified later

🔒 Security.

Backend handles authentication

Database access restricted via environment variables

No direct frontend access to MongoDB

🤝 Contribution

This project is open for contribution to help expand free education.
=======
# 3. Frontend (Terminal 2)
cd frontend
npm install
npm run dev

# 4. Access Application
# Open browser: http://localhost:3000
```

---

## 📊 Project Statistics

- **Total Files**: 20+ source files
- **Lines of Code**: ~3,500+ lines
- **API Endpoints**: 8 endpoints
- **Database Collections**: 4 collections
- **Pages**: 8 pages
- **Components**: 2 reusable components

---

## ✅ Testing Checklist

### Manual Testing Steps

1. **Authentication**
   - [ ] Signup with new user
   - [ ] Login with existing user
   - [ ] Verify protected route redirection
   - [ ] Logout functionality

2. **Student Management**
   - [ ] View student list
   - [ ] Add new student
   - [ ] Search/filter students
   - [ ] Update student information
   - [ ] Delete student (soft delete)

3. **Course System**
   - [ ] View course list
   - [ ] Expand course details
   - [ ] Play embedded YouTube videos
   - [ ] Verify video completion tracking
   - [ ] Navigate to certificate page

4. **Certificate Generation**
   - [ ] Enter name
   - [ ] Verify signature preview
   - [ ] Download certificate as PNG
   - [ ] Verify download tracking in database

5. **Navigation & UI**
   - [ ] Test all navigation links
   - [ ] Verify active route highlighting
   - [ ] Test responsive design on mobile
   - [ ] Check scroll-to-top on route changes

---

## 🔧 Troubleshooting

### Common Issues

**Issue: MongoDB connection error**
```
Solution: 
1. Ensure MongoDB is running (mongod command)
2. Check MONGO_URI in backend/config/db.js
3. Verify MongoDB is installed correctly
```

**Issue: CORS error in browser**
```
Solution:
1. Check backend server is running on port 5000
2. Verify CORS middleware is enabled in server.js
3. Ensure proxy is configured in vite.config.js
```

**Issue: YouTube videos not loading**
```
Solution:
1. Check internet connection
2. Verify YouTube video IDs are correct
3. Check browser console for API errors
4. Ensure YouTube IFrame API is loaded
```

**Issue: Certificate not downloading**
```
Solution:
1. Check browser console for errors
2. Verify html2canvas library is installed
3. Ensure popup blocker is disabled
4. Check if certificate element exists in DOM
```

---

## 🌟 Acknowledgments

- React team for the excellent UI library
- Express.js for the robust backend framework
- MongoDB for the flexible NoSQL database
- Vite for the lightning-fast build tool
- YouTube API for embedded video functionality
- html2canvas for certificate generation

---

**Built with ❤️ by the EduFuture Team**

Last Updated: January 10, 2026
>>>>>>> 021679e (Documentation changes)
