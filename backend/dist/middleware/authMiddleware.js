import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
console.log('JWT_SECRET:', JWT_SECRET);
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('Authorization header:', authHeader);
    console.log('Token received:', token);
    console.log(process.env.JWT_SECRET);
    if (!token) {
        console.error('No token provided');
        res.status(403).json({ message: 'Invalid or expired token' });
        return; // Ensure the function ends here
    }
    try {
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error('Token validation error:', error);
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};
export const authorizeRole = (role) => {
    return (req, res, next) => {
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
