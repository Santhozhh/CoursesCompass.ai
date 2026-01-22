# CoursesCompass.ai

A full-stack authentication application with MongoDB backend and React frontend.

## Features

- User Registration (name, email, password, confirm password)
- User Login (email, password)
- Secure password hashing with bcrypt
- JWT token-based authentication
- MongoDB database storage
- Modern, responsive UI

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas connection string)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd back-end
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `back-end` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/coursescompass
JWT_SECRET=your-secret-key-change-in-production
```

**Note:** If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

4. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd front-end
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## Project Structure

```
CoursesCompass.ai/
├── back-end/
│   ├── server.js          # Express server with auth routes
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables (create this)
├── front-end/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx      # Login component
│   │   │   ├── Register.jsx   # Registration component
│   │   │   ├── Dashboard.jsx  # Dashboard after login
│   │   │   ├── Auth.css       # Auth styling
│   │   │   └── Dashboard.css  # Dashboard styling
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json      # Frontend dependencies
└── README.md
```

## API Endpoints

### POST `/api/register`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### POST `/api/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### GET `/api/health`
Health check endpoint.

## Security Features

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens for secure authentication
- Password validation (minimum 6 characters)
- Email uniqueness validation
- CORS enabled for frontend-backend communication

## Technologies Used

### Backend
- Express.js
- MongoDB
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cors (Cross-Origin Resource Sharing)
- dotenv (environment variables)

### Frontend
- React
- Vite
- Modern CSS with gradients and animations

## Notes

- Make sure MongoDB is running before starting the backend server
- Update the `JWT_SECRET` in production with a strong, random string
- The frontend expects the backend to run on `http://localhost:5000`
- User tokens are stored in localStorage

## Troubleshooting

1. **MongoDB connection error**: Ensure MongoDB is running and the connection string is correct
2. **CORS errors**: Make sure the backend server is running and CORS is properly configured
3. **Port already in use**: Change the PORT in `.env` file or kill the process using that port
