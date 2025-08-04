⚙️ Task Manager Backend (MERN)
This is the backend for the MERN Task Manager application. It is built with Node.js, Express.js, and MongoDB, and serves RESTful APIs for user authentication, task management, and admin control.

task-manager-backend/
│
├── controllers/         # Logic for users, tasks, and admin operations
├── models/              # Mongoose schemas (User, Task)
├── routes/              # API route handlers
├── middlewares/         # Auth & error middleware
├── utils/               # Helper utilities (token, etc.)
├── config/              # DB connection
├── .env                 # Environment variables
├── server.js            # Entry point
├── package.json
└── README.md

🔧 Tech Stack
Node.js
Express.js
MongoDB with Mongoose
JWT for authentication
bcryptjs for password hashing
dotenv for environment configs
cors, helmet for security
Multer (optional for image upload if needed)

🧩 Features
👤 User
    Register & Login (with JWT)
    Create, Read, Update, Delete Tasks
    Confirm Task → Move to history
    Get personal task history

🛠️ Admin
    View all users and tasks
    Edit/Delete any user or task
    Filter tasks by user

📦 Installation
    # Clone the repository
    git clone https://github.com/your-username/task-manager-backend.git
    cd task-manager-backend
    
# Install dependencies
npm install

# Create .env file
touch .env

🔐 Environment Variables (.env)
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

▶️ Running the Server
    # Development
    npm run dev

   # Production
    npm start

📡 API Endpoints Overview
Method	Endpoint	Description	Auth Required
POST	/api/auth/register	Register a new user	✅
POST	/api/auth/login	Login existing user	✅
GET	/api/tasks	Get all user tasks	✅
POST	/api/tasks	Create new task	✅
PUT	/api/tasks/:id	Update task	✅
DELETE	/api/tasks/:id	Delete task	✅
PUT	/api/tasks/confirm/:id	Confirm task (to history)	✅
GET	/api/history	Get user's task history	✅
GET	/api/admin/users	Get all users	✅ (admin)
GET	/api/admin/tasks	Get all tasks	✅ (admin)
PUT	/api/admin/users/:id	Edit user	✅ (admin)
DELETE	/api/admin/users/:id	Delete user	✅ (admin)

🗃️ Models
🧍 User
{
  name: String,
  email: String,
  password: String (hashed),
  role: String (default: 'user') // 'admin' | 'user'
}
Task
{
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  status: String, // pending | confirmed
  createdAt: Date,
  updatedAt: Date
}

🚀 Deployment Notes
MongoDB Atlas for DB
Render / Railway / Cyclic for hosting
CORS enabled to allow frontend access

✅ Best Practices Used
Passwords hashed with bcrypt
JWT-based authentication
Role-based access control for admin
Organized folder structure
Error handling middleware
