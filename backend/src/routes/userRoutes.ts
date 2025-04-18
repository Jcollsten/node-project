import express from 'express';
import { registerUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import authenticateToken, { authorizeRole } from '../middleware/authMiddleware.js';
import { cacheMiddleware } from '../middleware/cacheMiddleware.js';

const router = express.Router();

router.post('/registerUser', registerUser);
router.get(
  '/getAllUsers',
  authenticateToken,
  authorizeRole('Admin'),
  cacheMiddleware(() => 'allUsers'),
  getAllUsers
);
router.get('/getUserById:id', authenticateToken, authorizeRole('Admin'), getUserById);
router.put('/updateUser:id', authenticateToken, authorizeRole('Admin'), updateUser);
router.delete('/deleteUser:id', authenticateToken, authorizeRole('Admin'), deleteUser);

export default router;
