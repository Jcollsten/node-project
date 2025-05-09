import { Request, Response } from 'express';
import { getAllBookingsService, getBookingsByUserIdService, getBookingsByRoomIdService, getBookingByIdService, createBookingService, updateBookingService, deleteBookingService, checkRoomAvailabilityService } from '../services/bookingService.js';
import { AuthenticatedRequest } from '../types/express';
import redisClient from '../utils/redisClient.js';
import logger from '../utils/loggerUtil.js';

// Get all bookings with pagination (Admin only)
export const getAllBookings = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  logger.info('Fetching all bookings');
  try {
    const { page = 1, limit = 10 } = req.query;
    const bookings = await getAllBookingsService(Number(page), Number(limit));
    await redisClient.set('allBookings', JSON.stringify(bookings), { EX: 3600 }); // Cache for 1 hour
    logger.info('All bookings fetched and cached');
    res.status(200).json(bookings);
  } catch (error) {
    logger.error('Error in getAllBookings:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get bookings by user ID (User-specific)
export const getBookingsByUserId = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  logger.info('Fetching bookings for user:', req.user?.id);
  try {
    const userId = req.user?.id;

    if (!userId) {
      logger.warn('User ID is missing, returning 403');
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    const bookings = await getBookingsByUserIdService(userId);
    logger.info('Bookings fetched for user:', userId);
    res.status(200).json(bookings);
  } catch (error) {
    logger.error('Error in getBookingsByUserId:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get bookings by room ID and optionally filter by date (Admin only)
export const getBookingsByRoomId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId } = req.body;
    const { date } = req.query;
    const bookings = await getBookingsByRoomIdService(Number(roomId), date as string);
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error in getBookingsByRoomId:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get booking by ID (User can access their own bookings; Admin can access all)
export const getBookingById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  console.log('Decoded user:', req.user);
  try {
    const { id } = req.body;
    const booking = await getBookingByIdService(Number(id));
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    // Ensure the user can only access their own bookings unless they are an Admin
    if (req.user?.role !== 'Admin' && booking.userId !== req.user?.id) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error('Error in getBookingById:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Create a new booking (User-specific)
export const createBooking = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const roomId = Number(req.body.roomId);
    const { startTime, endTime } = req.body;
    const userId = req.user?.id;

    if (!roomId || isNaN(roomId) || !startTime || !endTime || !userId) {
      res.status(400).json({ message: 'Missing or invalid required fields' });
      return;
    }

    // Check room availability
    const isAvailable = await checkRoomAvailabilityService(roomId, startTime, endTime);
    if (!isAvailable) {
      res.status(400).json({ message: 'Room is not available for the selected time' });
      return;
    }

    const booking = await createBookingService({ roomId, userId, startTime, endTime });
    await redisClient.del('allBookings');
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error in createBooking:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Update a booking
export const updateBooking = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { bookingId, startTime, endTime } = req.body;
    const userId = req.user?.id;

    if (!userId || !bookingId || !startTime || !endTime) {
      res.status(400).json({ message: 'Missing required fields: userId, bookingId, startTime, or endTime' });
      return;
    }

    const booking = await getBookingByIdService(Number(bookingId));
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    if (booking.userId !== userId) {
      res.status(403).json({ message: 'Forbidden: You can only update your own bookings' });
      return;
    }

    // Update the booking
    const updatedData = { startTime, endTime };
    const updatedBooking = await updateBookingService(Number(bookingId), updatedData);
    await redisClient.del('allBookings'); // Clear the cache
    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error('Error in updateBooking:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Delete a booking
export const deleteBooking = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.body;
    const userId = req.user?.id;
    const role = req.user?.role;

    // get the booking
    const booking = await getBookingByIdService(Number(id));
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    if (role !== 'Admin' && booking.userId !== userId) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    await deleteBookingService(Number(id));
    await redisClient.del('allBookings');
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteBooking:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
