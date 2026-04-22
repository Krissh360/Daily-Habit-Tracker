# Daily Habit Tracker

### Build better habits. Track daily progress. Analyze your consistency.

> A full-stack web application to help users build consistency, track daily habits, and gain actionable insights into their long-term productivity.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [System Architecture](#system-architecture)
5. [Execution Flow](#execution-flow)
6. [Architecture Flowchart](#architecture-flowchart)
7. [Project Structure](#project-structure)
8. [Prerequisites](#prerequisites)
9. [Installation Guide](#installation-guide)
10. [Usage Guide](#usage-guide)
11. [API Reference](#api-reference)
12. [Roadmap](#roadmap)
13. [Contributing](#contributing)
14. [License](#license)
15. [Author](#author)

---

## Project Overview

**Daily Habit Tracker** is a full-stack web application designed to help individuals build consistency, track daily habits, and improve long-term productivity through structured progress monitoring and analytics.

The application provides a clean, intuitive interface that allows users to register, log in, manage their personal habits, mark daily completions, and visualize their performance over time — all backed by a robust RESTful API and a scalable MVC-based backend architecture connected to MongoDB Atlas.

Whether you're trying to maintain a morning routine, hit daily fitness goals, or stay consistent with learning, Daily Habit Tracker gives you the structure and insight to stay on track.

---

## Features

### User Management
- Secure user registration and login
- JWT-based authentication
- Individual profile management per user

### Habit Management
- Create, update, and delete personal habits
- Mark habits as completed on a daily basis
- Maintain full historical completion records

### Analytics Dashboard
- Visual representation of habit completion rates
- Daily and weekly performance tracking
- Progress indicators to highlight streaks and gaps

### System Design
- RESTful API architecture
- MVC pattern with strict separation of concerns
- Cloud-hosted MongoDB Atlas integration
- Middleware-based authentication and request validation

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) | User interface and client-side logic |
| **Backend** | Node.js, Express.js | Server, routing, and API handling |
| **Database** | MongoDB Atlas + Mongoose | Cloud data storage and schema modeling |
| **Authentication** | JSON Web Tokens (JWT) | Secure user session management |
| **Dev Tools** | Git, GitHub, VS Code, Postman | Version control, development, API testing |

---

## System Architecture

The application is built on a **layered MVC architecture** with a clear, strict separation between the presentation layer, business logic, and data access. This design ensures modularity, testability, and long-term scalability.

```
┌──────────────────────────────────────────┐
│             PRESENTATION LAYER           │
│         HTML5 · CSS3 · JavaScript        │
│   (User-facing Interface & DOM Logic)    │
└────────────────────┬─────────────────────┘
                     │  HTTP Requests / Responses
┌────────────────────▼─────────────────────┐
│               API LAYER                  │
│          Express.js Routes               │
│    (Request Routing & Middleware Auth)   │
└────────────────────┬─────────────────────┘
                     │
┌────────────────────▼─────────────────────┐
│           BUSINESS LOGIC LAYER           │
│              Controllers                 │
│  (Request Handling, Validation, Logic)   │
└────────────────────┬─────────────────────┘
                     │
┌────────────────────▼─────────────────────┐
│           DATA ACCESS LAYER              │
│          Mongoose Models                 │
│      (Schema Definition & Queries)       │
└────────────────────┬─────────────────────┘
                     │
┌────────────────────▼─────────────────────┐
│            DATABASE LAYER                │
│          MongoDB Atlas (Cloud)           │
│     (Persistent Cloud Data Storage)      │
└──────────────────────────────────────────┘
```

---

## Execution Flow

The following describes the complete lifecycle of a request through the application:

```
  User Interaction
       │
       ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  1. User performs an action on the frontend (e.g., adds a   │
  │     habit, marks it complete, views analytics).             │
  └──────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  2. Frontend sends an HTTP Request to the Express API.      │
  │     (GET / POST / PUT / DELETE)                             │
  └──────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  3. Middleware runs first.                                  │
  │     — JWT token is verified for protected routes.          │
  │     — Request body is validated.                           │
  └──────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  4. Express Router matches the route and forwards           │
  │     the request to the appropriate Controller.             │
  └──────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  5. Controller processes the business logic:                │
  │     — Reads or mutates data as required.                   │
  │     — Calls the relevant Mongoose Model methods.           │
  └──────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  6. Mongoose Model executes the database operation against  │
  │     MongoDB Atlas (Create / Read / Update / Delete).       │
  └──────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  7. MongoDB Atlas returns the result to the Model.          │
  │     The Controller formats the response payload.           │
  └──────────────────────────┬──────────────────────────────────┘
                             │
                             ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  8. Express sends the JSON response back to the frontend.   │
  │     The UI updates to reflect the new state.               │
  └─────────────────────────────────────────────────────────────┘
```

---

## Architecture Flowchart

```
                        ┌─────────────────────┐
                        │      User (UI)       │
                        │  Browser Interface   │
                        └──────────┬──────────┘
                                   │
                        ┌──────────▼──────────┐
                        │   Frontend Layer     │
                        │  HTML · CSS · JS     │
                        └──────────┬──────────┘
                                   │  HTTP Request
                        ┌──────────▼──────────┐
                        │   Middleware Layer   │
                        │  JWT Auth · Validate │
                        └──────────┬──────────┘
                                   │
                  ┌────────────────▼────────────────┐
                  │           Express Router         │
                  └────┬──────────────┬─────────────┘
                       │              │
           ┌───────────▼──┐    ┌──────▼───────────┐
           │  Auth Routes  │    │   Habit Routes   │
           │ /api/auth/... │    │  /api/habits/... │
           └───────────┬───┘    └──────┬───────────┘
                       │               │
           ┌───────────▼───────────────▼───────────┐
           │               Controllers              │
           │     authController · habitController   │
           └───────────────────┬───────────────────┘
                               │
           ┌───────────────────▼───────────────────┐
           │              Mongoose Models           │
           │          User · Habit · History        │
           └───────────────────┬───────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   MongoDB Atlas      │
                    │  habit-tracker (DB)  │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │    JSON Response     │
                    │  Returned to Client  │
                    └─────────────────────┘
```

---

## Project Structure

```
Daily-Habit-Tracker/
│
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB Atlas connection setup
│   │
│   ├── controllers/
│   │   ├── authController.js      # Registration, login logic
│   │   └── habitController.js     # Habit CRUD and tracking logic
│   │
│   ├── models/
│   │   ├── User.js                # Mongoose schema for users
│   │   └── Habit.js               # Mongoose schema for habits
│   │
│   ├── routes/
│   │   ├── authRoutes.js          # Auth endpoint definitions
│   │   └── habitRoutes.js         # Habit endpoint definitions
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT token verification
│   │   └── validateMiddleware.js  # Request body validation
│   │
│   └── server.js                  # Application entry point
│
├── frontend/
│   ├── css/
│   │   └── style.css              # Application styles
│   │
│   ├── js/
│   │   └── app.js                 # Client-side JavaScript logic
│   │
│   ├── pages/
│   │   ├── dashboard.html         # Habit dashboard
│   │   ├── analytics.html         # Analytics view
│   │   └── login.html             # Login / Register page
│   │
│   └── index.html                 # Application entry HTML
│
├── .env                           # Environment variables (not committed)
├── .gitignore                     # Git ignore rules
├── package.json                   # Project metadata and dependencies
└── README.md                      # Project documentation
```

---

## Prerequisites

Ensure the following are installed and configured on your system before proceeding:

| Requirement | Version | Download |
|---|---|---|
| **Node.js** | v14 or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | Bundled with Node.js | — |
| **Git** | Any recent version | [git-scm.com](https://git-scm.com/) |
| **MongoDB Atlas Account** | Free tier or above | [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) |

> A MongoDB Atlas account is required. Create a free cluster, whitelist your IP address, and obtain your connection string from the Atlas dashboard before proceeding.

---

## Installation Guide

Follow these steps to get the project running on your local machine.

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Krissh360/Daily-Habit-Tracker.git
cd Daily-Habit-Tracker
```

### Step 2 — Install Dependencies

Install dependencies for the backend:

```bash
cd backend
npm install
```

If the frontend also has a package file:

```bash
cd ../frontend
npm install
```

### Step 3 — Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```bash
touch backend/.env
```

Add the following configuration to the file:

```env
# Server Configuration
PORT=5000

# MongoDB Atlas Connection String
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/habit-tracker?retryWrites=true&w=majority

# JWT Secret Key — replace with a strong, random string
JWT_SECRET=your_super_secret_key_here
```

Replace `<username>` and `<password>` with your MongoDB Atlas credentials. Your full connection string can be copied directly from the Atlas dashboard under **Connect > Connect your application**.

> **Never commit your `.env` file to version control.** Ensure it is listed in `.gitignore`.

### Step 4 — Start the Backend Server

```bash
cd backend
npm start
```

The server will start at `http://localhost:5000`. On startup, Mongoose will establish a connection to your MongoDB Atlas cluster and log a confirmation to the console.

### Step 5 — Launch the Frontend

**If using static HTML files:**

Open `frontend/index.html` directly in your browser, or serve it with a lightweight server:

```bash
# Using the VS Code Live Server extension, or:
npx serve frontend
```

**If using a dev server:**

```bash
cd frontend
npm run dev
```

The application will be accessible at `http://localhost:3000` (or the configured port).

---

## Usage Guide

Once the application is running, follow these steps to get started:

1. **Register an Account** — Navigate to the registration page and create a new user account with your name, email, and password.

2. **Log In** — Sign in using your registered credentials. A JWT token will be issued to authenticate your session.

3. **Create Habits** — From the dashboard, click **Add Habit** to create a new habit. Provide a name and any relevant details.

4. **Track Daily Completions** — Each day, visit the dashboard and mark your habits as completed. Your progress is recorded and stored against the current date.

5. **View Analytics** — Navigate to the **Analytics** section to view your daily and weekly completion rates, progress indicators, and historical trends.

6. **Manage Habits** — Edit or delete existing habits from the dashboard at any time.

---

## API Reference

All API endpoints are prefixed with `/api`. Requests to protected routes must include a valid JWT in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Log in and receive a JWT | No |

**Register — Request Body:**
```json
{
  "name": "Krissh Chhabra",
  "email": "krissh@example.com",
  "password": "securepassword"
}
```

**Login — Request Body:**
```json
{
  "email": "krissh@example.com",
  "password": "securepassword"
}
```

---

### Habits

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/habits` | Fetch all habits for the logged-in user | Yes |
| `POST` | `/api/habits` | Create a new habit | Yes |
| `PUT` | `/api/habits/:id` | Update an existing habit by ID | Yes |
| `DELETE` | `/api/habits/:id` | Delete a habit by ID | Yes |

**Create Habit — Request Body:**
```json
{
  "name": "Morning Run",
  "description": "30-minute jog every morning"
}
```

**Update Habit — Request Body:**
```json
{
  "completed": true
}
```

---

## Roadmap

The following enhancements are planned for future releases:

- [ ] **Advanced Analytics** — Rich interactive charts using Chart.js or D3.js for streak tracking and visual heatmaps
- [ ] **Mobile Responsive Design** — Fully optimized layout for smartphones and tablets
- [ ] **Push Notifications & Reminders** — Daily habit reminders via browser notifications
- [ ] **Multi-device Sync** — Seamless syncing of habit data across multiple devices
- [ ] **AI-based Habit Recommendations** — Smart suggestions powered by completion trends and behavioral patterns
- [ ] **Dark Mode** — Toggleable dark/light theme for better usability

---

## Contributing

Contributions are welcome and encouraged. To contribute to this project:

1. **Fork** this repository
2. **Create** a new feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes with a clear, descriptive message
   ```bash
   git commit -m "feat: add weekly streak tracking"
   ```
4. **Push** the branch to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** against the `main` branch with a detailed description of your changes

Please follow consistent code style and ensure your changes do not break existing functionality.

---

## License

This project is intended for **educational and demonstration purposes**. All rights are reserved by the author unless otherwise stated.

---

## Author

**Krissh Chhabra**
(https://github.com/Krissh360)

*Built with focus, consistency, and a genuine interest in full-stack development.*