import { Router } from 'express';
import authenticateToken, { authorizeRole } from '../middleware/authMiddleware.js';
import { getAllBookings, getBookingsByUserId, getBookingsByRoomId, getBookingById, createBooking, updateBooking, deleteBooking } from '../controllers/bookingController.js';
import { cacheMiddleware } from '../middleware/cacheMiddleware.js';

const router = Router();

// For users
router.get('/my-bookings', authenticateToken, getBookingsByUserId);
router.post('/createBooking', authenticateToken, createBooking);
router.put('/updateBooking', authenticateToken, updateBooking);
router.delete('/deleteBooking', authenticateToken, deleteBooking);

// For Admins
router.get(
  '/allBookings',
  authenticateToken,
  authorizeRole('Admin'),
  cacheMiddleware(() => 'allBookings'),
  getAllBookings
);
router.get('/room', authenticateToken, authorizeRole('Admin'), getBookingsByRoomId);
router.get('/user', authenticateToken, authorizeRole('Admin'), getBookingById);

export default router;
