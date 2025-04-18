import { io } from '../server.js';
export const notifyBookingCreated = (bookingData) => {
    io.emit('bookingCreated', bookingData);
};
export const notifyBookingUpdated = (bookingData) => {
    io.emit('bookingUpdated', bookingData);
};
export const notifyBookingDeleted = (bookingData) => {
    io.emit('bookingDeleted', bookingData);
};
