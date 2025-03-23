import express from 'express';
import { registerUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

// Define the /register route
router.post('/register', registerUser);

// Define the /users route to get all users
router.get('/', getAllUsers);

// Define the /users/:id route to get a specific user
router.get('/:id', getUserById);

// Define the /users/:id route to update a user
router.put('/:id', updateUser);

// Define the /users/:id route to delete a user
router.delete('/:id', deleteUser);

export default router;
