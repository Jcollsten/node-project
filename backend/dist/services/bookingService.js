import { PrismaClient } from '@prisma/client';
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
    return prisma.booking.create({
        data: {
            roomId,
            userId,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
        },
    });
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
    return prisma.booking.update({
        where: { id },
        data: updatedData,
    });
};
export const deleteBookingService = async (id) => {
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) {
        throw new Error('Booking not found');
    }
    return prisma.booking.delete({
        where: { id },
    });
};
export const checkRoomAvailabilityService = async (roomId, startTime, endTime) => {
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
