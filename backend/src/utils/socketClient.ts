import { io } from 'socket.io-client';

const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';
// node-project-production-1737.up.railway.app

console.log(`Starting WebSocket client. Connecting to: ${serverUrl}`);

const socket = io(serverUrl);

socket.on('connect', () => {
  console.log('Successfully connected to the WebSocket server');
});

socket.on('broadcast', (data) => {
  console.log('Broadcast received:', data);
});

socket.on('bookingCreated', (data) => {
  console.log(' Booking created event:', data);
});

socket.on('bookingUpdated', (data) => {
  console.log('Booking updated event:', data);
});

socket.on('bookingDeleted', (data) => {
  console.log('Booking deleted event:', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});
