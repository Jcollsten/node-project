import express from 'express';
import authenticateToken, { authorizeRole } from '../middleware/authMiddleware.js';
import { getAllRooms, getRoomById, updateRoom, deleteRoom, createRoom } from '../controllers/roomController.js';
import { cacheMiddleware } from '../middleware/cacheMiddleware.js';

const router = express.Router();

router.post('/createRoom', authenticateToken, authorizeRole('Admin'), createRoom);

router.get(
  '/getAllRooms',
  authenticateToken,
  cacheMiddleware(() => 'allRooms'),
  getAllRooms
);
router.get('/getRoomById', authenticateToken, getRoomById);
router.put('/UpdateRoom', authenticateToken, authorizeRole('Admin'), updateRoom);
router.delete('/DeleteRoom', authenticateToken, authorizeRole('Admin'), deleteRoom);

export default router;
