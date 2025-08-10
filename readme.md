# Note-Taking Application

A full-stack note-taking application built with **React**, **Node.js (Express)**, and **MySQL**, allowing users to securely create, manage, and categorize notes with authentication and authorization.

---

## 🚀 Features

### Core Features

- **CRUD for Notes**
  - Create notes
  - Edit notes
  - Delete notes
  - View all notes
  - View a single note
- **Categories**
  - Assign multiple categories to a note
  - Filter notes by category
- **Authentication**
  - User Signup
  - User verification via email during signup
  - User Login
  - Logout
  - Protected routes & APIs
- **Validation**
  - Frontend: HTML5 form attributes for instant feedback
  - Backend: Joi schema validation with error messages displayed in UI
- **Error Handling**
  - User-friendly error messages
  - Structured backend error responses
- **Security**
  - Password hashing with **bcrypt** for secure credential storage
  - **JWT**-based authentication for stateless user sessions
  - Route & API protection using authentication middleware
  - **Express-rate-limit** to mitigate brute-force and DDoS attacks
  - **Cookie-parser** for secure token handling in cookies
  - Environment variables with **dotenv** to protect sensitive data
  - Email verification via **Nodemailer**, sending tokenized links to confirm new user accounts
  - Duplicate account prevention by checking existing username and email before registration
- **Search Filtering**: Client-side filtering of notes based on search box input.

---

## 🛠 Engineering Decisions

- **Frontend**:
  - **React** for building a fast, responsive SPA.
  - Chose React hooks & reusable components for cleaner code and maintainability.
- **Backend**:
  - **Node.js + Express** for a lightweight, scalable REST API.
  - Layered architecture with routes, controllers, and services.
- **Database**:
  - **MySQL** for relational data and strong ACID guarantees.
  - Normalized tables for users, notes, categories, and note-category relationships.
- **Authentication**:
  - JWT stored in HTTP-only cookies for security.
  - Middleware for protecting routes.
  - Email verification (2FA)
- **State Management**:
  - React Context API for authentication state.
- **Validation**:
  - Backend: Joi schema validation
  - Frontend: Form input validation before submission
- **Filtering and pagination**:
  - Implemented on server-side for performance and scalability.

---

## 📦 Tech Stack

**Frontend**:

- React
- Axios
- React Router

**Backend**:

- Node.js
- Express
- JWT
- Bcrypt
- Joi
- cookie-parser
- cors
- express-async-hanlder
- jsonwebtoken
- nodemailer
- multer
  **Database**:
- MySQL

---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites

- Node.js (v16+)
- MySQL
- npm

### 2️⃣ Backend Setup

```bash
# Clone repository
git clone <repo-url>
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Update DB credentials, JWT secret, etc.

# Start backend server
npm run dev

```

### 3️⃣ Frontend Setup

```bash
cd frontend

# install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Update credentials listed out there

# Start frontend server
npm start
```

### 4️⃣ Database Setup

Database Requirement: Ensure you have MySQL installed along with a database management tool such as MySQL Workbench, phpMyAdmin, or any other software that supports SQL.
The program will automatically create database named **note_app** and required tables.

---

## 📡 API Endpoints

### Authentication

```bash
#Register user
POST /api/user/register

#Verify email
PATCH /api/user/verify-email

#User Login
POST /api/user/login

#User Logout
GET /api/user/Logout
```

### Profile

```bash
#View Profile
GET /api/user/me

#update profile image
PATCH /api/user/upload-profile-image
```

### Notes

```bash
#Create a note
POST /api/note

#Get all notes (with pagination & filters)
GET /api/note?page={page}&limit=5

#Get one specific note
GET /api/note/:id

#Update specific note
PATCH /api/note/:id

#Delete specific note
DELETE /api/note/:id
```

### Categories

```bash
#Get all categories
GET /api/note/note-category

```

## 📌 Assumptions

- Each note is owned by a single user and is private.
- Authentication is required for all note-related operations.
- Predefined Categories are set in database
- Every user must verify their email after registration to login.

## 🐞 Error Handling

-Structured JSON error responses from backend.
-Frontend displays clear validation and API error messages.
-Graceful handling of failed API calls.

## 🚧 Known Limitations / Future Improvements

- Add forget password feature to reset password
- Add note sharing features among user

## 📜 License

This project is for educational purposes and not intended for production use.

## 👨‍💻 Author

Keshab Aryal
