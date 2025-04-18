import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { registerUserService, getAllUsersService, getUserByIdService, updateUserService, deleteUserService } from '../services/userService.js';
import redisClient from '../utils/redisClient.js';
import logger from '../utils/loggerUtil.js';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  logger.info('Registering a new user');
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      logger.warn('User registration failed: Missing username or password');
      res.status(400).json({ message: 'Please provide username and password' });
      return;
    }

    const newUser = await registerUserService({ username, password });
    await redisClient.del('allUsers');
    logger.info('User registered successfully and cache invalidated');
    res.status(201).json(newUser);
  } catch (error) {
    logger.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  logger.info('Fetching all users');
  try {
    const users = await getAllUsersService();
    await redisClient.set('allUsers', JSON.stringify(users), { EX: 3600 });
    logger.info('All users fetched and cached');
    res.status(200).json(users);
  } catch (error) {
    logger.error('Error in getAllUsers:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    logger.error('Error in getUserById:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedUser = await updateUserService(id, updatedData);
    await redisClient.del('allUsers');
    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error('Error in updateUser:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteUserService(id);
    await redisClient.del('allUsers');
    res.status(204).send();
  } catch (error) {
    logger.error('Error in deleteUser:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
