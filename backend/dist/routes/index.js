import express from 'express';
import userRoutes from './userRoutes.js';
import roomRoutes from './roomRoutes.js';
import authRoutes from './authRoutes.js';
import bookingRoutes from './bookingRoutes.js';
const router = express.Router();
// Mount user routes
router.use('/users', (req, res, next) => {
    console.log('User routes accessed');
    next();
}, userRoutes);
router.use('/rooms', (req, res, next) => {
    console.log('Room routes accessed');
    next();
}, roomRoutes);
router.use('/auth', (req, res, next) => {
    console.log('Auth routes accessed');
    next();
}, authRoutes);
router.use('/bookings', (req, res, next) => {
    console.log('Booking routes accessed:', req.originalUrl);
    next();
}, bookingRoutes);
export default router;
