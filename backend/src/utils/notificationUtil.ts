import { io } from '../server.js';

export const notifyBookingCreated = (bookingData: any) => {
  io.emit('bookingCreated', bookingData);
};

export const notifyBookingUpdated = (bookingData: any) => {
  io.emit('bookingUpdated', bookingData);
};

export const notifyBookingDeleted = (bookingData: any) => {
  io.emit('bookingDeleted', bookingData);
};
