import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import dotenv from 'dotenv';
import { getUserByUsernameService } from '../services/userService.js';

dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = '1h';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  console.log('JWT_SECRET:', JWT_SECRET);
  console.log('JWT_EXPIRATION:', JWT_EXPIRATION);

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Please provide username and password' });
      return;
    }

    const user = await getUserByUsernameService(username);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    console.log('Plain-text password from request:', password);
    console.log('Hashed password from database:', user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password comparison result (bcrypt.compare):', isPasswordValid);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
