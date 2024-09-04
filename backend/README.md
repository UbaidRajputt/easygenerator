# Easy Generator Backend Service

## Description

This project is a Easy Generator Backend Service built with NestJS. It provides functionality for managing user authentication.

## Features

- User authentication (signup, login, refresh token)
- Role-based access control
- Health check endpoints
- Logging with Winston
- API documentation with Swagger
- MongoDB integration with Mongoose
- JWT-based authentication
- Password hashing with Argon2
- Environment configuration
- Error handling and custom exception filters
- Custom decorators for roles and public routes
- Zod validation for DTOs

## Prerequisites

- Node.js (v22.0.0)
- Yarn (v1.22.22)
- MongoDB

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd easy-generator-backend-service
   ```

2. Install dependencies:

   ```
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=3003
   DATABASE_URL=mongodb://localhost:27017/easy-generator
   JWT_SECRET=your_jwt_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   JWT_EXPIRES_IN=3d
   REFRESH_TOKEN_EXPIRES_IN=7d
   ```

## Running the Application

### Development Mode

yarn start:dev

### Production Mode

yarn start:prod
