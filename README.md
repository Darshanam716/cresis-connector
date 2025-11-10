
# CrisisConnect

CrisisConnect is a comprehensive web application designed to streamline emergency service requests and coordination. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), CrisisConnect provides a user-friendly platform for requesting emergency assistance such as fire, police, hospital, and medical support.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [User Registration and Login](#user-registration-and-login)
  - [Requesting Emergency Services](#requesting-emergency-services)
  - [Admin Panel](#admin-panel)
  - [Live Chat System](#live-chat-system)
  - [Donations](#donations)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Security Considerations](#security-considerations)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## Introduction

CrisisConnect aims to provide a seamless and efficient platform for users to request and receive emergency assistance. The application supports four types of emergency services: fire, police, hospital, and medical support. Users can register, log in, and request help, while administrators can view and manage these requests in real-time.

## Features

- User registration and login system
- Dashboard for requesting fire, police, hospital, and medical support
- Location-based emergency service requests
- Real-time admin panel for managing requests
- Live chat system for user-admin communication
- Donation system via QR code scanning
- Email notifications for request confirmations

## System Requirements

- Node.js
- MongoDB
- Express
- React
- npm (Node Package Manager)
- A web browser (e.g., Google Chrome, Mozilla Firefox)

## Installation

1. **Clone the repository:**
   \`\`\`
   git clone https://github.com/Darshanam716/cresis-connector.git
   \`\`\`

2. **Navigate to the project directory:**
   \`\`\`
   cd CrisisConnect
   \`\`\`

3. **Install server dependencies:**
   \`\`\`
   cd server
   npm install
   \`\`\`

4. **Install client dependencies:**
   \`\`\`
   cd ../client
   npm install
   \`\`\`

5. **Set up environment variables:**
   - Create a .env file in the server directory and configure the necessary environment variables (e.g., database URI, JWT secret).

6. **Start the development server:**
   - Start the backend server:
     \`\`\`
     cd server
     npm start
     \`\`\`
   - Start the frontend development server:
     \`\`\`
     cd ../client
     npm start
     \`\`\`

## Usage

### User Registration and Login

1. **Registration:**
   - Navigate to the registration page.
   - Fill in personal details including name, email, phone number, and password.
   - Submit the registration form.

2. **Login:**
   - Navigate to the login page.
   - Enter email and password.
   - Submit the login form to access the dashboard.

### Requesting Emergency Services

1. **Dashboard:**
   - After logging in, the user is directed to the dashboard.
   - The dashboard presents four emergency support options: Fire, Police, Hospital, and Medical.

2. **Requesting Help:**
   - Click on the desired emergency service button.
   - Choose whether help is needed at the current location or the home location.
   - Confirm the request.

3. **Confirmation:**
   - Users will receive a confirmation email once the request is processed.

### Admin Panel

1. **Login:**
   - Admins log in via the admin login page using their credentials.

2. **View Requests:**
   - The admin dashboard displays a list of user requests.

3. **Manage Requests:**
   - Admins can contact the nearest emergency service (police station, fire brigade, hospital, medical shop) based on the user’s location.
   - After dispatching help, the admin updates the request status.

### Live Chat System

- Users can contact admins through the live chat system for real-time assistance.

### Donations

- Users can donate to CrisisConnect by scanning the provided QR code.

## API Endpoints

### User Routes

- POST /api/users/register: Register a new user
- POST /api/users/login: User login
- GET /api/users/:id: Get user details

### Request Routes

- POST /api/requests: Create a new request
- GET /api/requests: Get all requests (Admin only)
- GET /api/requests/:id: Get request details
- PUT /api/requests/:id: Update request status (Admin only)

### Admin Routes

- POST /api/admin/login: Admin login

### Chat Routes

- GET /api/chat: Get chat messages
- POST /api/chat: Send a chat message

## Database Schema

### User Schema

- name: String
- email: String
- phone: String
- password: String (hashed)
- homeLocation: String

### Request Schema

- userId: ObjectId (reference to User)
- type: String (fire, police, hospital, medical)
- location: String
- status: String (pending, dispatched, completed)
- createdAt: Date

### Admin Schema

- username: String
- password: String (hashed)

### Chat Schema

- userId: ObjectId (reference to User)
- message: String
- timestamp: Date

## Security Considerations

- Passwords are hashed using bcrypt.
- JWT is used for authentication and authorization.
- SSL should be implemented for secure data transmission.
- Input validation and sanitization to prevent XSS and SQL injection attacks.

## Future Enhancements

- Mobile app version for Android and iOS.
- Integration with real-time GPS services for accurate location tracking.
- Enhanced admin dashboard with analytics.
- Multi-language support for wider accessibility.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any enhancements or bug fixes.
