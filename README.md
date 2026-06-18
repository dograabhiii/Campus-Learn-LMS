# 🎓 Campus Learn LMS

A full-stack Learning Management System (LMS) built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). Campus Learn provides a modern online learning platform where instructors can create and manage courses, while students can enroll, learn, and track their progress.

---

## 📌 Project Overview

Campus Learn LMS is designed to simplify online education by providing an interactive platform for course management, student enrollment, and learning progress tracking. The system supports role-based access for students and instructors, ensuring a secure and user-friendly learning environment.

---

## 🚀 Features

### 👨‍🎓 Student Features

* User Registration & Login
* Browse Available Courses
* Enroll in Courses
* Watch Course Lectures
* Track Learning Progress
* View Enrolled Courses Dashboard
* Secure Authentication

### 👨‍🏫 Instructor Features

* Instructor Dashboard
* Create New Courses
* Upload Course Content
* Manage Existing Courses
* View Enrolled Students
* Monitor Student Enrollment Statistics
* Update Course Information

### 🔒 Security Features

* JWT-Based Authentication
* Protected Routes
* Secure Password Storage
* Role-Based Authorization
* Environment Variable Configuration

---

## 🛠️ Technology Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* REST APIs

### Database

* MongoDB
* Mongoose ODM

### Other Tools

* Git & GitHub
* Postman
* VS Code

---

## 📂 Project Structure

```text
Campus-Learn-LMS/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/dograabhiii/Campus-Learn-LMS.git
cd Campus-Learn-LMS
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start Backend Server:

```bash
npm start
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

---

## 📊 Modules of the System

### Authentication Module

Handles user registration, login, and authorization.

### Course Management Module

Allows instructors to create, update, and manage courses.

### Enrollment Module

Enables students to enroll in available courses.

### Student Dashboard Module

Displays enrolled courses and learning progress.

### Instructor Dashboard Module

Provides analytics and enrolled student details.

### Database Management Module

Stores user, course, and enrollment data securely.

---

## 🔄 REST API Functionality

The application uses REST APIs for communication between frontend and backend services.

Key API Operations:

* User Authentication
* Course Creation
* Course Retrieval
* Student Enrollment
* Dashboard Statistics
* Student Management

---

## 🎯 Project Objectives

* Provide a centralized online learning platform.
* Simplify course management for instructors.
* Improve accessibility of educational resources.
* Enable secure and scalable learning management.
* Enhance student learning experience.

---

## 📈 Future Enhancements

* Live Classes Integration
* Video Conferencing Support
* Certificate Generation
* Online Assessments & Quizzes
* AI-Based Course Recommendations
* Real-Time Notifications
* Mobile Application Support

---

## 👨‍💻 Developed By

**Abhishek Dogra**

Bachelor of Computer Applications (BCA)

Academic Project – Campus Learn LMS

---

## 📄 License

This project is developed for educational and academic purposes.
