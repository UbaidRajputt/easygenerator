# Easy Generator Full-Stack Application

This project consists of a backend service built with NestJS and a frontend application built with Next.js.

## Prerequisites

- Node.js (v22.0.0)
- npm or yarn
- Docker and Docker Compose (for containerized setup)

## Running Both Projects Locally

1. Clone the repository:

   ```
   git clone <repository-url>
   cd project_name
   ```

2. Install dependencies for both projects:

   ```
   npm run install:all
   ```

3. Set up environment variables for both projects as described in their respective README files.

4. Start both projects concurrently:

   ```
   npm start
   ```

   This will start the backend on http://localhost:3030 and the frontend on http://localhost:3000.

## Running with Docker Compose

1. Make sure you have Docker and Docker Compose installed on your system.

2. Create a `.env` file in the root directory with the following content:

   ```
   MONGO_URI=mongodb://mongo:27017/easy-generator
   JWT_SECRET=your_jwt_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ```

3. Build and start the containers:

   ```
   docker compose up --build
   ```

   This will start the backend, frontend, and MongoDB services. The frontend will be accessible at http://localhost:3000 and the backend at http://localhost:3030.

4. To stop the services:
   ```
   docker compose down
   ```

## Project Structure

- `/backend`: NestJS backend service
- `/frontend`: Next.js frontend application

For more detailed information about each part of the project, please refer to the README files in their respective directories.

## Development

For development, it's recommended to run the projects separately as described in their individual README files. This allows for faster reload times and easier debugging.
