### README.md

# Blog App

A Blog Application built with NestJS, TypeORM, and Firebase for authentication and role management. This project includes a seeder to create a super admin user.

## Table of Contents
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Architecture](#architecture)
- [Challenges](#challenges)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-url.git
   cd blog-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL:
   - Ensure you have PostgreSQL installed and running on your machine.
   - Create a new PostgreSQL database for the application.

4. Configure Environment Variables:
   - Copy the environment configuration template:
     ```bash
     cp .env-temp .env
     ```
   - Fill in your personal values in the `.env` file, 
      including database connection details, super admin credentials and firebase keys

5. Add the Firebase service account key:
   - Place your `serviceAccountKey.json` file in the `src/config` directory. This file can be obtained from your Firebase project settings.

## Running the Application

1. Run the seeder script to create a super admin user:
   ```bash
   npm run seed
   ```

2. Start the application:
   ```bash
   npm run start:dev
   ```

3. The server will be running on `http://localhost:3000`.


## Architecture

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM**: An ORM for TypeScript and JavaScript (ES7, ES6, ES5). Used for managing database entities and migrations.
- **Firebase**: Used for authentication and role management.

### Key Components

- **Users Module**:
  - Manages user entities, and role assignments.
  - Includes CRUD operations and role updates.
  - Utilizes Firebase for authentication and custom user claims.

- **Posts Module**:
  - Manages blog posts with features like pagination, file uploads, and role-based access control.

- **Auth Module**:
  - Provides endpoints for user login.
  - Acts as the front end to generate tokens for users.

- **Firebase Integration**:
  - Includes a custom `FirebaseService` for token verification and role management.
  - `FirebaseAuthGuard` is used for protecting routes based on authentication.

- **Exception Handling**:
  - Custom `HttpExceptionFilter` for standardized error responses.

## Challenges

1. **Firebase Integration**:
   - Integrating Firebase with NestJS for authentication and role management required careful handling of asynchronous operations and error management.

2. **Seeding the Database**:
   - Ensuring the seeder script correctly initializes the application context and interacts with both the database and Firebase.

3. **Role Management**:
   - Implementing role-based access control and ensuring that certain critical operations (like modifying the super admin email) are protected.

4. **Configuration Management**:
   - Managing environment variables and ensuring sensitive information is securely stored and accessed.


### Summary

This comprehensive README file provides clear instructions for setting up, running, and understanding your Blog App project. It includes detailed sections for installation, seeding the database, running the application, architecture and challenges. Additionally, it specifies the required `serviceAccountKey.json` file for Firebase authentication.

If you have any further questions or need additional assistance, feel free to ask!