# 📝 BlogNest - Full Stack Blog Application

## 🧹 Project Overview
BlogNest is a modern blog publishing platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to:
- Sign up and log in securely
- Create, edit, and delete blog posts
- View their profile and other users’ posts
- Toggle between light and dark mode

> Note: This submission includes only the **web frontend + backend** (no mobile APK).

---

## ⚙️ Setup Instructions

### 🚀 Prerequisites
- Node.js and npm
- MongoDB (local or cloud)
- Git

### 🖥️ Backend Setup
```bash
cd backend
npm install
# Set up .env with DB_URI, JWT_SECRET, etc.
npm start
```

#### 📁 .env Example for Backend
```env
PORT=3000
MONGO_URI=mongodb+srv://siddhesh112004:password@cluster0.8sxbxze.mongodb.net
JWT_SECRET=siddhesh112004
JWT_EXPIRES=10d
```

### 🌐 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🤖 Prompting Techniques & AI Tool Usage

- Used **ChatGPT** for:
  - Writing clean, responsive React components
  - Explaining DaisyUI theme integration


### ❗ Challenges Faced:
- Synchronizing user authentication state across refresh
- Structuring responsive UI with Tailwind & DaisyUI
- Debugging CORS issues between frontend and backend

---

## 📬 API Documentation

Postman collection is available inside the `/docs` folder.
[Download Postman Collection](./docs/postman_collection.json)

---

## 📟️ Demo Video (Optional)
[Watch Demo on YouTube](https://www.youtube.com/watch?v=TCThP3RHeGY)

---

## 👨‍💻 Author
**Siddesh Dhanlobhe**  
Email: siddeshad112004@gmail.com  
GitHub: [@sidad112004](https://github.com/sidad112004)
