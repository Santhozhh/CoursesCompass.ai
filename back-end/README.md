# Backend Setup

## Environment Variables

Create a `.env` file in this directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/coursescompass
JWT_SECRET=your-secret-key-change-in-production
```

### MongoDB Connection

- **Local MongoDB**: Use `mongodb://localhost:27017/coursescompass`
- **MongoDB Atlas**: Use your Atlas connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/coursescompass`)

## Running the Server

```bash
# Install dependencies
npm install

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000` (or the port specified in `.env`).

## API Endpoints

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/health` - Health check
