# AK Cloud Backend

This is the backend for the AK Cloud application.

## Prerequisites

- Node.js
- MongoDB (running locally or Atlas)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file in the `server` directory (if not exists) with:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/akcloud
   JWT_SECRET=your_secret_key
   ```

3. Run the server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user info (requires `auth-token` header)
