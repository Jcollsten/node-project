import express from 'express';
import userRoutes from './userRoutes';

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

// Future routes like /rooms can be added here
// router.use('/rooms', roomRoutes);

export default router;
