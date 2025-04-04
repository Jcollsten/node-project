import { Router } from 'express';
import authenticateToken, { authorizeRole } from '../middleware/authMiddleware.js';
import { getAllBookings, getBookingsByUserId, getBookingsByRoomId, getBookingById, createBooking, updateBooking, deleteBooking } from '../controllers/bookingController.js';

const router = Router();

// For users
router.get('/my-bookings', authenticateToken, getBookingsByUserId); // Get bookings by user ID (User-specific)
router.post('/', authenticateToken, createBooking); // Create a booking (User-specific)
router.put('/:id', authenticateToken, updateBooking); // Update a booking (User can update their own)
router.delete('/:id', authenticateToken, deleteBooking); // Delete a booking (User can delete their own)

// For Admins
router.get('/', authenticateToken, authorizeRole('Admin'), getAllBookings); // Get all bookings
router.get('/room/:roomId', authenticateToken, authorizeRole('Admin'), getBookingsByRoomId); // Get bookings by room ID
router.get('/:id', authenticateToken, authorizeRole('Admin'), getBookingById); // Get booking by ID (Admin can access all)

export default router;
