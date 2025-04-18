import jwt from 'jsonwebtoken';
import logger from '../utils/loggerUtil.js';
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
console.log('JWT_SECRET:', JWT_SECRET);
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        logger.warn('Unauthorized access attempt: Missing token');
        res.status(401).json({ message: 'Unauthorized: Token is missing' });
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        logger.info(`Token verified for user ID: ${decoded.id}`);
        next();
    }
    catch (error) {
        logger.error('Unauthorized access attempt: Invalid or expired token');
        res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};
export const authorizeRole = (role) => {
    return (req, res, next) => {
        logger.info(`Checking user role: ${req.user?.role}, Required role: ${role}`);
        if (!req.user || req.user.role !== role) {
            logger.warn(`Role mismatch: Required: ${role}, Found: ${req.user?.role}`);
            res.status(403).json({ message: 'Forbidden, you do not have the necessary permissions' });
            return;
        }
        logger.info('User role validated, proceeding...');
        next();
    };
};
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: 'Forbidden, you do not have the necessary permissions' });
            return;
        }
        next();
    };
};
export default authenticateToken;
