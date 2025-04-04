import express from 'express';
import authenticateToken, { authorizeRole } from '../middleware/authMiddleware.js';
import { createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom } from '../controllers/roomController.js';

const router = express.Router();

router.post('/', authenticateToken, authorizeRole('Admin'), createRoom);
router.get('/', authenticateToken, getAllRooms);
router.get('/:id', authenticateToken, getRoomById);
router.put('/:id', authenticateToken, authorizeRole('Admin'), updateRoom);
router.delete('/:id', authenticateToken, authorizeRole('Admin'), deleteRoom);

export default router;
