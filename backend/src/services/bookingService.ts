import { PrismaClient } from '@prisma/client';
import { io } from '../server.js'; // Import socket instance

const prisma = new PrismaClient();

export const getAllBookingsService = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  return prisma.booking.findMany({
    skip: offset,
    take: limit,
    include: {
      Room: true,
      User: true,
    },
  });
};

export const getBookingsByUserIdService = async (userId: string) => {
  console.log('Fetching bookings for userId:', userId);
  return prisma.booking.findMany({
    where: { userId },
    include: {
      Room: true,
    },
  });
};

export const getBookingsByRoomIdService = async (roomId: number, date?: string) => {
  const filters: any = { roomId };
  if (date) {
    filters.startTime = {
      gte: new Date(date),
    };
  }
  return prisma.booking.findMany({
    where: filters,
    include: { User: true },
  });
};

export const getBookingByIdService = async (id: number) => {
  console.log('Fetching booking with ID:', id);
  if (!id) {
    throw new Error('Booking ID is required');
  }
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      Room: true,
      User: true,
    },
  });
  return booking;
};

export const createBookingService = async (bookingData: { roomId: number; userId: string; startTime: string; endTime: string }) => {
  const { roomId, userId, startTime, endTime } = bookingData;
  const isAvailable = await checkRoomAvailabilityService(roomId, startTime, endTime);
  if (!isAvailable) {
    throw new Error('Room is not available for the selected time');
  }

  const booking = await prisma.booking.create({
    data: {
      roomId,
      userId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    },
  });

  // Notify clients about the new booking
  io.emit('bookingCreated', booking);

  return booking;
};

export const updateBookingService = async (id: number, updatedData: any) => {
  const booking = await prisma.booking.findUnique({ where: { id } });

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (updatedData.startTime || updatedData.endTime) {
    const isAvailable = await checkRoomAvailabilityService(booking.roomId, updatedData.startTime || booking.startTime.toISOString(), updatedData.endTime || booking.endTime.toISOString());
    if (!isAvailable) {
      throw new Error('Room is not available for the selected time');
    }
  }

  const updatedBooking = await prisma.booking.update({
    where: { id },
    data: updatedData,
  });

  // Notify clients about the updated booking
  io.emit('bookingUpdated', updatedBooking);

  return updatedBooking;
};

export const deleteBookingService = async (id: number) => {
  const booking = await prisma.booking.findUnique({ where: { id } });

  if (!booking) {
    throw new Error('Booking not found');
  }

  const deletedBooking = await prisma.booking.delete({
    where: { id },
  });

  // Notify clients about the deleted booking
  io.emit('bookingDeleted', deletedBooking);

  return deletedBooking;
};

export const checkRoomAvailabilityService = async (roomId: number, startTime: string, endTime: string) => {
  const overlappingBookings = await prisma.booking.findMany({
    where: {
      roomId,
      OR: [
        {
          startTime: { lte: new Date(endTime) },
          endTime: { gte: new Date(startTime) },
        },
      ],
    },
  });

  return overlappingBookings.length === 0;
};
