import { PrismaClient } from '@prisma/client';
import { io } from '../server.js';
const prisma = new PrismaClient();
export const getAllBookingsService = async (page, limit) => {
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
export const getBookingsByUserIdService = async (userId) => {
    console.log('Fetching bookings for userId:', userId);
    return prisma.booking.findMany({
        where: { userId },
        include: {
            Room: true,
        },
    });
};
export const getBookingsByRoomIdService = async (roomId, date) => {
    const filters = { roomId };
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
export const getBookingByIdService = async (id) => {
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
export const createBookingService = async (bookingData) => {
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
    // send notification
    io.emit('bookingCreated', booking);
    return booking;
};
export const updateBookingService = async (id, updatedData) => {
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
    // Notify clients
    io.emit('bookingUpdated', updatedBooking);
    return updatedBooking;
};
export const deleteBookingService = async (id) => {
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) {
        throw new Error('Booking not found');
    }
    const deletedBooking = await prisma.booking.delete({
        where: { id },
    });
    // Notify clients
    io.emit('bookingDeleted', deletedBooking);
    return deletedBooking;
};
export const checkRoomAvailabilityService = async (roomId, startTime, endTime) => {
    const overlappingBookings = await prisma.booking.findMany({
        where: {
            roomId,
            OR: [
                {
                    startTime: { lte: new Date(endTime) }, //less than or equal to endTime
                    endTime: { gte: new Date(startTime) }, //greater than or equal to startTime
                },
            ],
        },
    });
    return overlappingBookings.length === 0;
};
