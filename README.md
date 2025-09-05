# Real-Time Messaging Platform

A prototype real-time messaging platform built with **Laravel (PHP)**, **Laravel Reverb (WebSockets)**, and **Angular**.

This project demonstrates **real-time communication, role-based access, and secure API design**.  
It was developed as a technical exercise and serves as a strong example of full-stack web development.

---

## Features
- 🔐 Secure session-based authentication with CSRF/XSRF protection  
- 💬 Real-time messaging powered by **Laravel Reverb** (self-hosted WebSocket server)  
- 👤 User and Admin roles:
  - Users can send messages  
  - Admins can view and mark messages as processed  
- ⚡ Asynchronous notifications: processed messages are pushed only to the correct user  
- 🛠️ Built with **Laravel 11**, **Angular 19**, **MySQL**, and **Vite**  

---

## Architecture
- **Frontend (Angular)**: SPA with authentication, protected routes, and real-time subscriptions  
- **Backend (Laravel)**: APIs, authentication (Laravel Sanctum), and message logic  
- **WebSocket Server (Laravel Reverb)**: Broadcast channels for notifications  
- **Database (MySQL)**: Stores users and messages, with a seeded Admin account  

---

## Getting Started

### 1. Requirements
- PHP 8.2+  
- Composer  
- Node.js & npm  
- MySQL  
- Symfony CLI (for HTTPS certificates)  

### 2. Backend (Laravel)
```bash
cd rtmp-backend
composer install
npm install
php artisan migrate
php artisan db:seed --class=AdminUserSeeder
symfony serve
```
Backend runs at: https://127.0.0.1:8000/

### 3. WebSocket Server (Laravel Reverb)
```bash
php artisan reverb:start
php artisan queue:work
```
Reverb runs at: https://127.0.0.1:8080/

### 4. Frontend (Angular)
```bash
cd rtmp-frontend
npm install
npm start
```
Frontend runs at: https://127.0.0.1:4200/

### 5. Credentials
Default admin user is seeded automatically:
- Username: admin
- Password: admin

---

## Notes

- All apps must run on HTTPS for CSRF security to work
- Certificates can be generated via Symfony CLI and configured in Angular + Reverb
- Update ports/configs if they differ on your machine

---

## Improvements

- Refactor channels for large-scale usage
- Improve Angular component/service structure
- Add better UI/UX styling
- Restrict route access for authenticated users only
