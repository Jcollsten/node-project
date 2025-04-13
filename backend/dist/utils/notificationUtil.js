import { io } from '../server.js';
export const notifyRoomCreated = (roomData) => {
    io.emit('roomCreated', roomData);
};
