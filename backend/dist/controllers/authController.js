import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getUserByUsernameService } from '../services/userService';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = '1h';
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}
export const loginUser = async (req, res) => {
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
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        res.status(200).json({ token });
    }
    catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
