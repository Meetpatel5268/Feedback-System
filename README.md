**📌 Feedback Management Dashboard — Full Stack (React + Node + Mongo + JWT)**

A production-ready **Feedback Management System** where users submit feedback and **admins** manage analytics, view all feedback, and create new admin accounts.
Built with **React (Vite) + Tailwind**, **Node.js + Express**, **MongoDB**, and **JWT authentication**.

---

## 🚀 **Features**

### **Public**

* Submit feedback with:

  * Name
  * Email
  * Message
  * Rating (1–5)
* Instant success/error response

### **Admin (Protected)**

* JWT Login
* View all feedback entries
* Analytics dashboard:

  * Total feedbacks
  * Average rating
  * Positive (≥4) feedback count
  * Negative (≤2) feedback count
* Create new admin accounts
* Secure protected routes
* Logout handling
* Optional:

  * Search/filter feedback
  * Export CSV

---

## 🧩 **Tech Stack**

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router
* JWT stored in localStorage

### Backend

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication
* bcrypt for password hashing
* CORS

---

## 📁 **Project Structure**

```
root/
│
├── backend/
│   ├── models/
│   │   ├── Feedback.js
│   │   └── Admin.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   └── feedback.js
│   ├── middleware/
│   │   └── auth.js
│   ├── index.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── FeedbackForm.jsx
    │   │   └── Dashboard.jsx
    │   ├── components/
    │   │   ├── FeedbackTable.jsx
    │   │   ├── StatCard.jsx
    │   │   └── Navbar.jsx
    │   ├── api/
    │   │   └── axios.js
    │   ├── App.jsx
    │   └── main.jsx
    └── .env
```

---

## 🔌 **API Endpoints**

### **Authentication**

#### `POST /api/auth/login`

Admin login → returns JWT
Request:

```
{
  "email": "",
  "password": ""
}
```

---

### **Admin Management**

#### `POST /api/admin/create` *(Admin only)*

Create a new admin account.
Requires valid JWT.

```
{
  "email": "",
  "password": ""
}
```

---

### **Feedback**

#### `POST /api/feedback`

Public feedback submission
Body:

```
{
  "name": "",
  "email": "",
  "message": "",
  "rating": 1-5
}
```

#### `GET /api/feedback` *(Admin only)*

Returns all feedbacks sorted by date.

---

### **Analytics**

#### `GET /api/stats` *(Admin only)*

Returns:

```
{
  "totalFeedbacks": 0,
  "avgRating": 0,
  "positiveCount": 0,
  "negativeCount": 0
}
```

---

## 🛠 **Environment Variables**

### Backend → `.env`

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

### Frontend → `.env`

```
VITE_API_URL=https://your-backend-url.com
```

---

## 🧪 **Run Locally**

### **Backend**

```
cd backend
npm install
npm start
```

### **Frontend**

```
cd frontend
npm install
npm run dev
```
