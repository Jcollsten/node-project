import { io } from 'socket.io-client';
console.log('Starting WebSocket client...');
const socket = io('http://localhost:3000');
socket.on('connect', () => {
  console.log('Successfully connected to the WebSocket server');
  console.log('Connected to the server');
  // Example: Emit a test event
  socket.emit('testEvent', { message: 'Hello from client!' });
});
socket.on('broadcast', (data) => {
  console.log('Broadcast received:', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});
