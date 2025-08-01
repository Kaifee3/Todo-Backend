# Todo Backend API

A RESTful API for managing todo tasks with user authentication.

## Features

- User registration and authentication with JWT
- CRUD operations for todo tasks
- User profile management
- Admin panel for viewing all tasks

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory with:
   ```
   MONGODB_URI=mongodb://localhost:27017/todo
   PORT=8080
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

3. **Start MongoDB:**
   Make sure MongoDB is running on your system.

4. **Run the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user info (requires auth)

### User Management
- `POST /api/users/get-user` - Get user by email
- `PUT /api/users/update-user` - Update user profile

### Tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:email` - Get tasks by user email
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks` - Get all tasks (admin)

## Request Examples

### Register User
```json
POST /api/users/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "gender": "male",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Login
```json
POST /api/users/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Task
```json
POST /api/tasks
{
  "title": "Complete project",
  "description": "Finish the todo application",
  "email": "john@example.com"
}
```

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing 