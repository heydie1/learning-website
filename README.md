# Learning Website - Full Stack Application

A comprehensive full-stack learning platform built with React, Node.js, Express, and PostgreSQL.

## Features

- 📚 **Course Management**: Browse and manage courses
- 👤 **User Authentication**: Secure login and registration
- 📖 **Lessons**: Organized lessons within courses
- 📊 **Progress Tracking**: Track completed lessons and user progress
- 🎯 **Interactive Learning**: Complete lessons and track achievements

## Tech Stack

### Backend
- Node.js + Express
- PostgreSQL
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

### Frontend
- React 18
- React Router v6
- Axios for API calls
- CSS3 with responsive design

## Project Structure

```
learning-website/
├── server.js                 # Main server file
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── courses.js           # Course routes
│   ├── lessons.js           # Lesson routes
│   └── progress.js          # Progress tracking routes
├── db/
│   └── schema.sql           # Database schema
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── App.js          # Main App component
│   │   └── index.js        # Entry point
│   └── package.json
├── .env.example             # Environment variables template
├── package.json             # Backend dependencies
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/heydie1/learning-website.git
   cd learning-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your PostgreSQL credentials

5. Create the database and run schema:
   ```bash
   psql -U postgres
   CREATE DATABASE learning_db;
   \c learning_db
   \i db/schema.sql
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course

### Lessons
- `GET /api/lessons/course/:courseId` - Get lessons by course
- `GET /api/lessons/:id` - Get lesson by ID
- `POST /api/lessons` - Create new lesson

### Progress
- `GET /api/progress/user/:userId` - Get user progress
- `POST /api/progress/complete` - Mark lesson as complete

## Usage

1. Register a new account or login
2. Browse available courses
3. Click on a course to view lessons
4. Complete lessons and track your progress
5. View your learning statistics

## Sample Data

You can add sample courses and lessons through the API:

```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Introduction to JavaScript",
    "description": "Learn the basics of JavaScript programming",
    "category": "Programming"
  }'
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions, please open an issue on GitHub.
