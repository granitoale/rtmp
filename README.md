# Real-time Messaging Platform
This repository contains a prototype for a real-time messaging platform. The application is built with a clear separation of concerns, featuring an Angular frontend and a Laravel backend. It demonstrates a full-stack approach to handling asynchronous message processing and real-time user notifications.

The core functionality allows a user to send a message from the frontend to the backend. The backend processes the message, and a response is then sent back to the user asynchronously. A key feature is ensuring that the notification of a processed message is only delivered to the appropriate user. The project also includes a simple administration interface for simulating message processing delays.

---

## Technology Stack
- Frontend: Angular 19
- Backend: Laravel 11
- Real-time Communication: Laravel Reverb (WebSocket server)
- Database: MySQL

---

## Architecture

The application's architecture is composed of three main components:

### Angular Frontend 
A single-page application (SPA) that handles all user interactions. It communicates with the backend exclusively through APIs and leverages WebSockets for real-time updates.

### Laravel Backend
Manages data, provides API endpoints for the frontend, and acts as a bridge to the WebSocket server. It follows Laravel's best practices for authentication, policies, and event handling.

### Laravel Reverb
The self-hosted WebSocket server that facilitates real-time communication. It dispatches events and creates channels for delivering messages to the frontend.

---

For security, all application endpoints (Angular, Laravel, and Laravel Reverb) are configured to run on SSL/TLS with a trusted certificate, using CSRF protection.

---

## Running the Application Locally

To run this application, you will need to set up a development environment that supports SSL/TLS. The following instructions are based on a setup using Symfony CLI, which simplifies the process of managing certificates.

### Prerequisites
- PHP
- Node.js & npm
- Composer
- A MySQL database instance

---

## Setup and Configuration

### Install a Trusted Certificate
The application requires a trusted certificate for all endpoints. You can install one using the Symfony CLI:

```bash
symfony server:ca:install
```

### Configure Environment Variables
Duplicate the .env.example file to .env in the rtmp-backend directory and configure your database settings.

### Run Migrations and Seeding
Navigate to the rtmp-backend directory and run the migrations to create the necessary database tables. 
A seeder class is provided to create a default admin user with:
- username: "admin"
- password: "admin"

```bash
php artisan migrate
php artisan db:seed --class=AdminUserSeeder
```

---

## Starting the Servers

### Start the Laravel Backend
Serve the Laravel application with the Symfony CLI to enable SSL/TLS:
```bash
symfony serve
```

### Start the Vite Server
Run the Vite server for the Laravel backend:
```bash
npm run dev
```

### Start Laravel Reverb and the Queue Worker
These are essential for handling events and dispatching messages.
```bash
php artisan reverb:start
php artisan queue:work
```

### Start the Angular Frontend
Navigate to the rtmp-frontend directory and start the Angular application:
```bash
npm start
```

The applications are normally served at the following addresses.
If your local environment assigns different ports, you may need to adjust the source code files accordingly.
- Laravel Backend: https://127.0.0.1:8000/
- Laravel Reverb: localhost:8080
- Angular Frontend: https://127.0.0.1:4200/

---

## Future Improvements
If this project were to be made production-ready, several areas could be improved or extended. Key areas for consideration include:
- Security: Further restricting access to the Laravel dashboard for normal users.
- Code Organization: Refactoring services to better separate concerns, such as splitting authentication and messaging logic.
- Scalability: Implementing a more scalable channel structure for real-time updates to handle a large number of users and messages.
- User Interface: A more polished and user-friendly visual design for a better user experience.
