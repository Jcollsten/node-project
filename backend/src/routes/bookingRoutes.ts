import { Router } from 'express';
import authenticateToken, { authorizeRole } from '../middleware/authMiddleware.js';
import { getAllBookings, getBookingsByUserId, getBookingsByRoomId, getBookingById, createBooking, updateBooking, deleteBooking } from '../controllers/bookingController.js';
import { cacheMiddleware } from '../middleware/cacheMiddleware.js';

const router = Router();

// For users
router.get('/my-bookings', authenticateToken, getBookingsByUserId);
router.post('/createBooking', authenticateToken, createBooking);
router.put('/updateBooking:id', authenticateToken, updateBooking);
router.delete('/:id', authenticateToken, deleteBooking);

// For Admins
router.get(
  '/allBookings',
  authenticateToken,
  authorizeRole('Admin'),
  cacheMiddleware(() => 'allBookings'),
  getAllBookings
);
router.get('/room/:roomId', authenticateToken, authorizeRole('Admin'), getBookingsByRoomId);
router.get('/user/:id', authenticateToken, authorizeRole('Admin'), getBookingById);

export default router;
