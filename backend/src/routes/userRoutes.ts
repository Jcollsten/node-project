import express from 'express';
import { registerUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import authenticateToken, { authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/', authenticateToken, authorizeRole('Admin'), getAllUsers);
router.get('/:id', authenticateToken, authorizeRole('Admin'), getUserById);
router.put('/:id', authenticateToken, authorizeRole('Admin'), updateUser);
router.delete('/:id', authenticateToken, authorizeRole('Admin'), deleteUser);

export default router;
