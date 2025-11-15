# Feedback Management Dashboard

A full-stack feedback management system built with React (Vite), Node.js, Express, and MongoDB.

## Features

- ✅ Submit feedback with name, email, message, and rating (1-5)
- ✅ Admin dashboard with statistics (total, average rating, positive/negative counts)
- ✅ View all feedback in a sortable, filterable table
- ✅ Search and filter feedback by rating
- ✅ Export feedback to CSV
- ✅ JWT-based authentication for admin access
- ✅ Responsive design with Tailwind CSS

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- CORS enabled

### Frontend
- React 18 with Vite
- React Router
- Axios for API calls
- Tailwind CSS
- React Hot Toast for notifications

## Project Structure

```
.
├── backend/
│   ├── index.js           # Main server file
│   ├── models/
│   │   └── Feedback.js    # Feedback model
│   ├── routes/
│   │   ├── feedback.js    # Feedback routes
│   │   └── auth.js        # Auth routes
│   ├── middleware/
│   │   └── auth.js        # JWT verification middleware
│   ├── .env               # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── FeedbackForm.jsx
    │   │   ├── Login.jsx
    │   │   └── Dashboard.jsx
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── StatCard.jsx
    │   │   └── FeedbackTable.jsx
    │   ├── api/
    │   │   └── axios.js   # Axios configuration
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env               # Environment variables
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env` if needed
   - Update `MONGO_URI` with your MongoDB connection string
   - Update `JWT_SECRET` with a secure random string

4. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Update `VITE_API_URL` in `.env` to point to your backend URL
   - Default: `http://localhost:5000`

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## API Endpoints

### Public Endpoints

- `POST /api/feedback` - Submit feedback
  - Body: `{ name, email, message, rating }`

### Protected Endpoints (Require JWT)

- `GET /api/feedback` - Get all feedback (latest first)
- `GET /api/feedback/stats` - Get statistics
  - Returns: `{ totalFeedbacks, avgRating, positiveCount, negativeCount }`

### Authentication

- `POST /api/auth/login` - Admin login
  - Body: `{ email, password }`
  - Returns: `{ token, user }`

**Default Admin Credentials:**
- Email: `admin@feedback.com`
- Password: `admin123`

## Deployment

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your repository
3. Add environment variables:
   - `MONGO_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A secure random string
   - `PORT` - (Optional, Render provides this)
4. Build command: `cd backend && npm install`
5. Start command: `cd backend && npm start`

### Frontend (Vercel)

1. Create a new project on Vercel
2. Connect your repository
3. Set root directory to `frontend`
4. Add environment variable:
   - `VITE_API_URL` - Your backend URL (e.g., `https://your-backend.onrender.com`)
5. Build command: `npm run build`
6. Deploy

## Usage

1. **Submit Feedback**: Visit the homepage and fill out the feedback form
2. **View Dashboard**: Login with admin credentials to access the dashboard
3. **Manage Feedback**: View, search, filter, and export feedback from the dashboard

## Development

- Backend runs in development mode with auto-reload
- Frontend uses Vite HMR for fast development
- Both projects support hot reloading

## License

ISC

