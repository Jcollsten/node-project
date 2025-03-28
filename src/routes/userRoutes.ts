import express from 'express';
import { registerUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = express.Router();

// Define the /register route
router.post('/register', registerUser);

// Define the /users route to get all users (Admin only)
router.get('/', authenticateToken, authorizeRole('Admin'), getAllUsers);

// Define the /users/:id route to get a specific user (Admin only)
router.get('/:id', authenticateToken, authorizeRole('Admin'), getUserById);

// Define the /users/:id route to update a user (Admin only)
router.put('/:id', authenticateToken, authorizeRole('Admin'), updateUser);

// Define the /users/:id route to delete a user (Admin only)
router.delete('/:id', authenticateToken, authorizeRole('Admin'), deleteUser);

export default router;
