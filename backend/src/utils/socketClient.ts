import { io } from 'socket.io-client';

console.log('Starting WebSocket client...');

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Successfully connected to the WebSocket server');
  console.log('Connected to the server');
});

socket.on('broadcast', (data) => {
  console.log('Broadcast received:', data);
});

socket.on('bookingCreated', (data) => {
  console.log('Booking created event received:', data);
});

socket.on('bookingUpdated', (data) => {
  console.log('Booking updated event received:', data);
});

socket.on('bookingDeleted', (data) => {
  console.log('Booking deleted event received:', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});
