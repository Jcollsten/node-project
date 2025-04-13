import { registerUserService, getAllUsersService, getUserByIdService, updateUserService, deleteUserService } from '../services/userService.js';
export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'Please provide username and password' });
            return;
        }
        // Pass the plain-text password to the service
        const newUser = await registerUserService({ username, password });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService();
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error in getAllUsers:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error in getUserById:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedUser = await updateUserService(id, updatedData);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error('Error in updateUser:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteUserService(id);
        res.status(204).send();
    }
    catch (error) {
        console.error('Error in deleteUser:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
