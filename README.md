# Full Stack Assignment

## Table of Contents

- [Prerequisites](#prerequisites)
- [Application Setup](#application-setup)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Database Setup](#database-setup)
- [Running the Application (localhost)](#running-the-application-localhost)
- [API Endpoints](#api-endpoints)
- [Assumptions & Suggestions](#assumptions--suggestions)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Git
- Docker (v24.0 or higher)
- Docker Compose (v2.0 or higher)

## Application Setup

1. Clone the repository:

```bash
git clone https://github.com/DarkPromise/explosive-pig.git
```

2. Create .env file in the **frontend**, **backend** and **database** directories. You may use the provided `.env.example` files as a reference.

```
# Frontend .env file
VITE_BACKEND_URL=http://localhost:3000

# Backend .env file
PORT=3000
POSTGRES_CONNECTION_STRING=postgresql://postgres:explosive-pig@localhost:5432/postgres

# Database .env file
POSTGRES_PASSWORD=explosive-pig
```

## Frontend Setup

Navigate to the frontend directory and install its dependencies:

```bash
cd frontend
npm install
```

## Backend Setup

Navigate to the backend directory and install its dependencies:

```bash
cd backend
npm install
```

## Database Setup

Docker is used for setting up the database locally
<br/>Move into the database directory and run the following commands to set up the PostgreSQL database
<br/>This may take some time while docker pulls the image from the internet

```bash
cd database
docker compose up -d --wait
```

When the database is ready, you may optionally run the backend service, which will automatically create the database tables if they do not exist.
<br/>Either way, the database will be synced every time the backend service is started, provided the database is running.
```
# For development
cd backend
npm run dev 

# For production
npm run build
npm run start
```

## Running the Application (localhost)

Ensure that the database is running

1. Start the PostgreSQL database locally:

```bash
cd database
docker compose up -d --wait
```

2. Start the backend service:

```bash
cd backend

# For development
npm run dev

# For production
npm run build
npm run start
```

3. Start the frontend service:
<br/> You may encounter build errors, but they can be ignored as the frontend service will still run.

```bash
cd frontend

# For development
npm run dev

# For production
npm run build
npm run start
```

The application will be available at http://localhost:5173, and the backend API will be available at http://localhost:3000/.

## API Endpoints
The backend API provides the following endpoints:
- `GET /api/teachers`: Retrieve all teachers
- `POST /api/teachers`: Create a new teacher
- `GET /api/classes`: Retrieve all classes
- `POST /api/classes`: Create a new class

## Assumptions & Suggestions
For this assignment, I only followed the requirements as outlined in the gist.
</br>I have included certain files that I used in my day to day work, such as the .vscode folder with settings I commonly use.

For what can be improved in this assignment, I would do the following:
- Better UI/UX for the frontend, such as having proper theming for the application. (I have tried to match the UI as closely as possible, even with 1 or 2px differences)
- Implementing full API CRUD functionality for both `Class` and `Teacher`. (The current implementation only has Create and Read functionalities)
- Implementing a more robust error handling mechanism in the backend. (Instead of just 200, 201, etc)
- Adding tests for both the frontend and backend. (This was optional, and I did not have time to implement it)
- Better structuring of project files