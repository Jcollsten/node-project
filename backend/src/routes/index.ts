import express from 'express';
import userRoutes from './userRoutes.js';
import roomRoutes from './roomRoutes.js';
import authRoutes from './authRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import logger from '../utils/loggerUtil.js';

const router = express.Router();

// Mount user routes
router.use(
  '/users',
  (req, res, next) => {
    logger.info('User routes accessed');
    next();
  },
  userRoutes
);

router.use(
  '/rooms',
  (req, res, next) => {
    logger.info('Room routes accessed');
    next();
  },
  roomRoutes
);

router.use(
  '/auth',
  (req, res, next) => {
    logger.info('Auth routes accessed');
    next();
  },
  authRoutes
);

router.use(
  '/bookings',
  (req, res, next) => {
    logger.info('Booking routes accessed:', req.originalUrl);
    next();
  },
  bookingRoutes
);

export default router;
