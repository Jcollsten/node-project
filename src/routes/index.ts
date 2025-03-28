import express from 'express';
import userRoutes from './userRoutes';
import roomRoutes from './roomRoutes';
import authRoutes from './authRoutes';
import bookingRoutes from './bookingRoutes';

const router = express.Router();

// Mount user routes
router.use(
  '/users',
  (req, res, next) => {
    console.log('User routes accessed');
    next();
  },
  userRoutes
);

router.use(
  '/rooms',
  (req, res, next) => {
    console.log('Room routes accessed');
    next();
  },
  roomRoutes
);

router.use(
  '/auth',
  (req, res, next) => {
    console.log('Auth routes accessed');
    next();
  },
  authRoutes
);

router.use(
  '/bookings',
  (req, res, next) => {
    console.log('Booking routes accessed:', req.originalUrl);
    next();
  },
  bookingRoutes
);

export default router;
