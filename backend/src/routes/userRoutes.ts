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
router.get('/getUserById', authenticateToken, authorizeRole('Admin'), getUserById);
router.put('/updateUser', authenticateToken, authorizeRole('Admin'), updateUser);
router.delete('/deleteUser', authenticateToken, authorizeRole('Admin'), deleteUser);

export default router;
