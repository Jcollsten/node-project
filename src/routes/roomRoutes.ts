import express from 'express';
import { createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom } from '../controllers/roomController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticateToken, authorizeRole('Admin'), createRoom);
router.get('/', authenticateToken, getAllRooms);
router.get('/:id', authenticateToken, getRoomById);
router.put('/:id', authenticateToken, authorizeRole('Admin'), updateRoom);
router.delete('/:id', authenticateToken, authorizeRole('Admin'), deleteRoom);

export default router;
