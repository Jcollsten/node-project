# Coworking Space Booking Platform

## Overview

## Features

To run this program locally you will need to provide your own DB setup of redis and psql. I run these thorugh Docker desktop with docker Images

## Starting this project and running it locally

1. Clone the repository from git and navigate to the backend folder:
   git clone <repository-url>
   cd backend

2. Install dependencies:
   npm install

3. Start Docker containers for Redis and PostgreSQL:
   npm run docker-up

4. Apply Prisma migrations, so set up your Postgres DB for the correct Schema:
   npm run prisma-migrate

5. Start the development server:
   npm run dev

6. Start the Socket Client for testing
   npm run test:socket

## Scripts

- `npm run docker-up`: Start Docker containers for Redis and PostgreSQL.
- `npm run docker-down`: Stop Docker containers.
- `npm run dev`: Start the development server with nodemon.
- `npm run prisma-migrate`: Apply Prisma migrations.
- `npm run prisma-generate`: Generate Prisma client.
- `npm run prisma-studio`: Open Prisma Studio for database management.
- `npm run test:socket`: Run the WebSocket test client.

## API Endpoints

### Authentication

- **POST http://localhost:3000/api/login**: Log in and receive a JWT token.

### Rooms (Admin Only)

- **POST http://localhost:3000/api/rooms/createRoom**: Create a new room.
- **GET http://localhost:3000/api/rooms/getAllRooms**: Fetch a list of all rooms.
- **GET http://localhost:3000/api/rooms/getRoomById:id**: Fetch a room by ID.
- **PUT http://localhost:3000/api/rooms/UpdateRoom:id**: Update a room by ID.
- **DELETE http://localhost:3000/api/rooms/DeleteRoom:id**: Delete a room by ID.

### Bookings

- **GET http://localhost:3000/api/bookings/my-bookings**: Fetch bookings for the logged-in user.
- **POST http://localhost:3000/api/bookings/createBooking**: Create a new booking.
- **PUT http://localhost:3000/api/bookings/updateBooking:id**: Update a booking by ID.
- **DELETE http://localhost:3000/api/bookings/:id**: Delete a booking by ID.
- **GET http://localhost:3000/api/bookings/allBookings**: Fetch all bookings (Admin only).
- **GET http://localhost:3000/api/bookings/room/:roomId**: Fetch bookings by room ID (Admin only).
- **GET http://localhost:3000/api/bookings/user/:id**: Fetch bookings by user ID (Admin only).

### Users

- **POST http://localhost:3000/api/users/registerUser**: Register a new user.
- **GET http://localhost:3000/api/users/getAllUsers**: Fetch all users (Admin only).
- **GET http://localhost:3000/api/users/getUserById:id**: Fetch a user by ID (Admin only).
- **PUT http://localhost:3000/api/users/updateUser:id**: Update a user by ID (Admin only).
- **DELETE http://localhost:3000/api/users/deleteUser:id**: Delete a user by ID (Admin only).

## Deployment

- The application is deployed at: `<deployment-url>`

## Technologies Used

- Node.js
- Express.js
- Prisma
- Redis
- Socket.io
- Winston
- Bcrypt

## Notes
