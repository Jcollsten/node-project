import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/express'; // Import the custom type

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  console.log('Authenticating token...');
  console.log('Headers received:', req.headers);

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Extracted Token:', token);

  if (!token) {
    console.log('No token provided');
    res.status(401).json({ message: 'Unauthorized, token is missing or invalid' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    req.user = decoded;
    console.log('Token authenticated successfully:', decoded);
    console.log('Decoded user in authenticateToken:', req.user);
    next();
  } catch (error) {
    console.error('Error in authenticateToken:', error);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const authorizeRole = (role: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    console.log(`Checking user role: ${req.user?.role}`);
    console.log(`Required role: ${role}`);

    if (!req.user || req.user.role !== role) {
      console.log(`User role mismatch. Required: ${role}, Found: ${req.user?.role}`);
      res.status(403).json({ message: 'Forbidden, you do not have the necessary permissions' });
      return;
    }
    console.log('User role validated, proceeding...');
    next();
  };
};
