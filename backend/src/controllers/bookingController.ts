import { Request, Response } from 'express';
import { getAllBookingsService, getBookingsByUserIdService, getBookingsByRoomIdService, getBookingByIdService, createBookingService, updateBookingService, deleteBookingService, checkRoomAvailabilityService } from '../services/bookingService.js';
import { AuthenticatedRequest } from '../types/express';

// Get all bookings with pagination (Admin only)
export const getAllBookings = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  console.log('Decoded user:', req.user);
  try {
    const { page = 1, limit = 10 } = req.query;
    const bookings = await getAllBookingsService(Number(page), Number(limit));
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error in getAllBookings:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get bookings by user ID (User-specific bookings)
export const getBookingsByUserId = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  console.log('Controller hit: getBookingsByUserId');
  console.log('Decoded user in getBookingsByUserId:', req.user);

  try {
    const userId = req.user?.id;
    console.log('User ID from token:', userId);

    if (!userId) {
      console.log('User ID is missing, returning 403');
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    // Fetch bookings for the user
    const bookings = await getBookingsByUserIdService(userId);
    console.log('Bookings returned to controller:', bookings);
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error in getBookingsByUserId:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get bookings by room ID and optionally filter by date (Admin only)
export const getBookingsByRoomId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId } = req.params;
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
    const { id } = req.params;
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
    const { roomId, startTime, endTime } = req.body;
    const userId = req.user?.id;

    if (!roomId || !startTime || !endTime || !userId) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Check room availability
    const isAvailable = await checkRoomAvailabilityService(roomId, startTime, endTime);
    if (!isAvailable) {
      res.status(400).json({ message: 'Room is not available for the selected time' });
      return;
    }

    const booking = await createBookingService({ roomId, userId, startTime, endTime });
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error in createBooking:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Update a booking (User can update their own bookings; Admin can update any)
export const updateBooking = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const userId = req.user?.id;
    const role = req.user?.role;

    // Fetch the booking to ensure the user has access
    const booking = await getBookingByIdService(Number(id));
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    if (role !== 'Admin' && booking.userId !== userId) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    const updatedBooking = await updateBookingService(Number(id), updatedData);
    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error('Error in updateBooking:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Delete a booking (User can delete their own bookings; Admin can delete any)
export const deleteBooking = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const role = req.user?.role;

    // Fetch the booking to ensure the user has access
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
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteBooking:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
