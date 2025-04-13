import express from 'express';
import authenticateToken, { authorizeRole } from '../middleware/authMiddleware.js';
import { getAllRooms, getRoomById, updateRoom, deleteRoom, createRoom } from '../controllers/roomController.js';

const router = express.Router();

router.post('/createRoom', authenticateToken, authorizeRole('Admin'), createRoom);

router.get('/getAllRooms', authenticateToken, getAllRooms);
router.get('/:id', authenticateToken, getRoomById);
router.put('/:id', authenticateToken, authorizeRole('Admin'), updateRoom);
router.delete('/:id', authenticateToken, authorizeRole('Admin'), deleteRoom);

export default router;
