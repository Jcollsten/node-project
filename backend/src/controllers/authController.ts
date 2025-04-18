import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { getUserByUsernameService } from '../services/userService.js';
import logger from '../utils/loggerUtil.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = '1h';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  logger.info('Login attempt for user:', req.body.username);

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      logger.warn('Login failed: Missing username or password');
      res.status(400).json({ message: 'Please provide username and password' });
      return;
    }
    // check if the user exists
    const user = await getUserByUsernameService(username);
    if (!user) {
      logger.warn(`Login failed: User not found for username: ${username}`);
      res.status(404).json({ message: 'User not found' });
      return;
    }
    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn(`Login failed: Invalid password for username: ${username}`);
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    logger.info(`Login successful for user: ${username}`);

    res.status(200).json({ token });
  } catch (error) {
    logger.error('Error in loginUser:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
