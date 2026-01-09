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
cd backend
npm install
npm start


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

🔒 Security

Backend handles authentication

Database access restricted via environment variables

No direct frontend access to MongoDB

🤝 Contribution

This project is open for contribution to help expand free education.
