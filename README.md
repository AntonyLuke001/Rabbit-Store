# 🐰 Rabbit Store – MERN Stack Application

Rabbit Store is a full-stack MERN (MongoDB, Express, React, Node.js) application
designed to manage products, users, and orders with authentication.

---

## 📁 Project Structure

Rabbit-Store/
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md

---

## 🚀 Features

- User Authentication using JWT
- Secure Login and Registration
- Role-based Access (Admin / User)
- RESTful APIs with Express
- MongoDB Database Integration
- Modern React Frontend using Vite
- Clean and scalable project architecture

---

## 🛠️ Tech Stack

Frontend:
- React
- Vite
- JavaScript
- CSS

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## ⚙️ Environment Variables

Create `.env` files in both backend and frontend folders.

Backend (.env):
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  

Frontend (.env):
VITE_API_URL=http://localhost:5000  

---

## ▶️ How to Run the Project Locally

1. Clone the repository
git clone https://github.com/AntonyLuke001/Rabbit-Store.git  
cd Rabbit-Store  

2. Start Backend
cd backend  
npm install  
npm start  

3. Start Frontend
cd frontend  
npm install  
npm run dev  

---

## 📌 Notes

- node_modules and .env files are ignored using .gitignore
- This project follows industry-standard MERN architecture
- Ideal for learning full-stack development and interviews

---

## 👨‍💻 Author

Antony Luke

---

## ⭐ Future Improvements

- Payment Gateway Integration
- Order Management System
- Admin Dashboard
- Deployment using Vercel and Render
